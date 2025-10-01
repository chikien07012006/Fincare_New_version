from django.urls import path
from .views import LoanOptionView, geminiView

urlpatterns = [
    path('create/', LoanOptionView.as_view(), name='loan-option'),
    path('gemini/', geminiView.as_view(), name='gemini')
]
