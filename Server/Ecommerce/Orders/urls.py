from django.urls import path 

from .views import getOrders, getOrder, placeOrder, stripeCheckout, getAllOrders, editOrder

urlpatterns = [
    path('', getOrders),
    path('all/', getAllOrders),
    path('create-checkout-session/', stripeCheckout),
    path('create/', placeOrder),
    path("<str:id>/", getOrder),
    path('edit/<uuid:id>/', editOrder)
]