from django.urls import path, include
from .views import createShipment, getShipments, getShipment, makeDefaultAddr, updateShipment, deleteShipment, getAdminShipments


urlpatterns = [
    path('create/', createShipment),
    path('', getShipments),
    path('admin/<str:name>/', getAdminShipments),
    path('<uuid:id>/', getShipment),
    path('defaultAddr/<str:id>/', makeDefaultAddr),
    path('update/<uuid:id>/', updateShipment),
    path('delete/<uuid:id>/', deleteShipment)
]