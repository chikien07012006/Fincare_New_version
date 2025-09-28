from django.urls import path
from .views import LoanApplyView

urlpatterns = [
    path('apply/', LoanApplyView.as_view(), name='loan-apply'),
]
