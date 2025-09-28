from rest_framework import serializers
from .models import LoanApplication, LoanEvaluation
from . import base_line_scoring
from django.db import transaction

class LoanApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanApplication
        exclude = ('dti', 'ltv', 'created_at')  # dti/ltv computed server-side
        read_only_fields = ("user",)

    def validate(self, data):
        # basic checks
        if data['monthly_income'] <= 0:
            raise serializers.ValidationError("monthly_income must be > 0")
        if data['loan_amount'] <= 0:
            raise serializers.ValidationError("loan_amount must be > 0")
        return data

    def create(self, validated_data):
        # compute derived fields and scoring inside a transaction
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            validated_data["user"] = request.user   
              
        with transaction.atomic():
            app = LoanApplication.objects.create(**validated_data)

            # compute dti and ltv and save
            dti_val = base_line_scoring.compute_dti(app.monthly_debt_payments, app.monthly_income)
            app.dti = dti_val
            if app.loan_type == 'car' and app.vehicle_value:
                app.ltv = base_line_scoring.compute_ltv(app.loan_amount, app.vehicle_value)
            elif app.loan_type == 'real_estate' and app.property_value:
                app.ltv = base_line_scoring.compute_ltv(app.loan_amount, app.property_value)
            app.save() # bước quan trọng để lưu dti/ltv vào DB

            # evaluate baseline
            if app.loan_type == 'car':
                result = base_line_scoring.evaluate_car(app)
            else:
                result = base_line_scoring.evaluate_real_estate(app)

            evaluation = LoanEvaluation.objects.create(
                application=app,
                baseline_score=result['baseline_score'],
                eligible=result['eligible'],
                knockout_reasons=result.get('knockout_reasons', []),
                score_breakdown=result.get('breakdown', {})
            )

            # prepare response payload in serializer/ Để dùng sau
            self._last_evaluation = evaluation
            return app

class LoanEvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanEvaluation
        fields = "__all__" # Bao gồm tất cả các trường khai báo
        # class này không có logic validate hay create đặc biệt nào => chỉ dùng để serialize dữ liệu từ DB ra JSON cho frontend thôi
