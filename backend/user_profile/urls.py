from django.urls import path
from .views import LoanApplyView, LoanEvaluationViewSet

urlpatterns = [
    path('apply/', LoanApplyView.as_view(), name='loan-apply'),
    path('evaluations/', LoanEvaluationViewSet.as_view(), name='loan-evaluations')
]
