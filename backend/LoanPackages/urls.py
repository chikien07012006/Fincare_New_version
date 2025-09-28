from django.urls import path
from .views import LoanOptionView

urlpatterns = [
    path('create/', LoanOptionView.as_view(), name='loan-option'),
]
