from rest_framework import serializers
from .models import LoanOption

class LoanOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanOption
        fields = "__all__"  # Bao gồm tất cả các trường trong LoanOption model
        # class này không có logic validate hay create đặc biệt nào => chỉ dùng để serialize dữ liệu từ DB ra JSON cho frontend thôi
        
    def create(self, validated_data):
        # Logic tạo mới LoanOption nếu cần (thường không cần trong API chỉ đọc)
        return LoanOption.objects.create(**validated_data)