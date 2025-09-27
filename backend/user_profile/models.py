from django.db import models
from django.conf import settings
from django.utils import timezone

class LoanType(models.TextChoices):
    CAR = "car", "Car Loan"
    REAL_ESTATE = "real_estate", "Real Estate Loan"

class LoanApplication(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  
    # liên kết hồ sơ vay với user đã đăng nhập
    loan_type = models.CharField(max_length=20, choices=LoanType.choices)  
    # chọn loại vay: ô tô hoặc bất động sản

    # Income & Debt
    monthly_income = models.DecimalField(max_digits=12, decimal_places=2)  
    # thu nhập hàng tháng
    monthly_debt_payments = models.DecimalField(max_digits=12, decimal_places=2, default=0)  
    # tổng nợ phải trả hàng tháng (các khoản vay khác)

    # Credit info
    cic_group = models.IntegerField(help_text="1..5 (1 = best, 5 = worst)")  
    # nhóm nợ CIC (1 tốt nhất, 5 xấu nhất)
    credit_history_months = models.IntegerField(default=0)  
    # số tháng có lịch sử tín dụng
    credit_utilization_pct = models.FloatField(null=True, blank=True)  
    # % sử dụng thẻ tín dụng
    num_late_payments_24m = models.IntegerField(default=0)  
    # số lần trả chậm trong 24 tháng
    num_new_inquiries_6m = models.IntegerField(default=0)  
    # số lần mở khoản vay mới trong 6 tháng
    credit_mix_types = models.IntegerField(default=1, help_text="Number of different credit types")  
    # số loại tín dụng đang có (thẻ, vay trả góp, …)

    # Loan / Collateral
    loan_amount = models.DecimalField(max_digits=14, decimal_places=2)  
    # số tiền vay mong muốn
    down_payment = models.DecimalField(max_digits=14, decimal_places=2, default=0)  
    # số tiền trả trước
    vehicle_value = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)  
    # giá trị xe (nếu vay ô tô)
    property_value = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)  
    # giá trị BĐS (nếu vay nhà)

    # Employment
    employment_type = models.CharField(max_length=50, null=True, blank=True)  
    # loại hợp đồng lao động
    employment_duration_months = models.IntegerField(default=0)  
    # thời gian làm việc
    salary_payment_method = models.CharField(max_length=20, null=True, blank=True)  
    # cách nhận lương: bank_transfer hay cash

    additional_info = models.JSONField(null=True, blank=True)  
    # chỗ chứa thông tin bổ sung (vd: số tháng dự phòng)

    created_at = models.DateTimeField(default=timezone.now)

    # computed fields (hệ thống tự tính)
    dti = models.FloatField(null=True, blank=True)  # Debt-to-Income
    ltv = models.FloatField(null=True, blank=True)  # Loan-to-Value

    def __str__(self):
        return f"LoanApplication {self.id} user={self.user_id} type={self.loan_type}"

# Model để lưu kết quả chấm điểm baseline
class LoanEvaluation(models.Model):
    application = models.ForeignKey(LoanApplication, on_delete=models.CASCADE, related_name="evaluations")
    baseline_score = models.FloatField()
    eligible = models.BooleanField()  # hồ sơ pass hay fail
    knockout_reasons = models.JSONField(null=True, blank=True)  # lý do loại trực tiếp
    score_breakdown = models.JSONField(null=True, blank=True)   # chi tiết điểm
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Evaluation for App {self.application_id} score={self.baseline_score}"
