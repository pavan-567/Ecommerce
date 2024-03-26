from django.db import models
from uuid import uuid4
from Auth.models import User
from Shipment.models import Shipment

# Create your models here.

PAYMENT_CHOICES = (
    ('cash', 'cash'),
    ('card', 'card')
)

COLOR_CHOICES = (
    ('red', 'red'),
    ('white', 'white'),
    ('black', 'black')
)

ORDER_STATUS_CHOICES = (
    ('processing', 'processing'),
    ('shipped', 'shipped'),
    ('out_for_delivery', 'out_for_delivery'),
    ('delivered', 'delivered'),
    ('cancelled', 'cancelled')
)


DELIVERY_STATUS_CHOICES = (
    ('pending', 'pending'),
    ('success', 'sucess'),
    ('failed', 'failed')
)

PAYMENT_STATUS_CHOICES = (
    ('pending', 'pending'),
    ('paid', 'paid')
)

class Order(models.Model) : 
    id = models.UUIDField(primary_key= True, default= uuid4)
    user = models.ForeignKey(User, on_delete= models.CASCADE)
    totalItems = models.IntegerField()
    paymentMethod = models.CharField(max_length= 10, choices= PAYMENT_CHOICES)
    paymentStatus = models.CharField(max_length= 100, choices= PAYMENT_STATUS_CHOICES, default= 'pending')
    deliveryStatus = models.CharField(max_length= 100, choices= DELIVERY_STATUS_CHOICES,default= 'pending')
    orderStatus = models.CharField(max_length= 100, choices= ORDER_STATUS_CHOICES, default= 'processing')

    deliveryDate = models.DateTimeField(null= True)
    
    totalPrice = models.IntegerField() # models.PositiveSmallIntegerField()
    
    discountedPrice = models.IntegerField()

    shipment = models.ForeignKey(Shipment, on_delete= models.SET_NULL, related_name= 'shipment_address', null= True)

    created_at = models.DateTimeField(auto_now_add= True) 
    updated_at = models.DateTimeField(auto_now= True) 


class CartOrderItems(models.Model) :
    # One Order Can Have Multiple Cart Order Items
    id = models.UUIDField(primary_key= True, default= uuid4)
    orders = models.ForeignKey(Order, on_delete= models.CASCADE, related_name= 'cart_order')

    # One Product Can Have One Cart Order Item
    product = models.ForeignKey('Products.Product', on_delete= models.CASCADE, related_name= 'product_order')
    
    quantity = models.IntegerField(default= 0)
    # productStatus = models.CharField(max_length= 100)

    # title
    title = models.CharField(max_length= 100)
    image = models.CharField(max_length= 200)
    color = models.CharField(max_length= 10, choices= COLOR_CHOICES, null= True)
    

    # Price : Price Of 1 Item
    totalPrice = models.DecimalField(decimal_places= 2, max_digits= 999999)
    discountedPrice = models.DecimalField(decimal_places= 2, max_digits= 999999)


