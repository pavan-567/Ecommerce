from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import UserRegistrationView, MyTokenObtainPairView, getProfile, ChangeProfilePicture, editProfile, ChangePassword

urlpatterns = [
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', UserRegistrationView.as_view()),
    path('api/profile/', getProfile),
    path('api/changeProfilePic/', ChangeProfilePicture),
    path('api/edit/', editProfile),
    path('api/password/', ChangePassword)
]