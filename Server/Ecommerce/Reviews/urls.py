from django.urls import path
from .views import *

urlpatterns = [
    path('', getReviews),
    path('create/', createReview)
]