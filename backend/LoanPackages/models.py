from django.db import models

class LoanType(models.TextChoices):
    CAR = "car", "Car Loan"
    REAL_ESTATE = "real_estate", "Real Estate Loan"

class LoanOption(models.Model):
    bank_name = models.CharField(max_length=200)
    loan_type = models.CharField(max_length=20, choices=LoanType.choices) 
    title = models.CharField(max_length=255)  # e.g., "Car Loan - Silver"
    exclusive_interest_rate = models.CharField(max_length=80)  # "As low as X%/year"
    estimated_term = models.CharField(max_length=80)  # "Up to Y years"
    key_requirement = models.CharField(max_length=255)  # short text e.g., "Min. Income: 15M VND"
    key_icon = models.CharField(max_length=255, null=True, blank=True)  # url to bank icon
    average_processing_time = models.CharField(max_length=80)  # "Avg. 7-10 working days"

    def __str__(self):
        return f"{self.bank_name} - {self.title}"
