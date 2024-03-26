from django.contrib import admin
from .models import Order, CartOrderItems

# Register your models here.
admin.site.register(Order)
admin.site.register(CartOrderItems)
