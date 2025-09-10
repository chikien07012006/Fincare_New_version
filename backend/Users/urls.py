from django.urls import path
from .views import RegisterView, LoginView, UserProfileViewSet

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileViewSet.as_view({'get': 'list'}), name='profile')
]
