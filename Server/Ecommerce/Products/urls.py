from django.urls import path 
from .views import *

urlpatterns = [
    # path('productsInit/', initializeProducts),
    path('all/', getProducts),
    path('', getProductsViaQuery),
    # path('', ProductListView.as_view()),
    path('create/', createProduct),
    path('<str:id>/', getProduct),
    path('img/<str:id>/', deleteProductImage),
    path('edit/<str:id>/', editProduct)
]