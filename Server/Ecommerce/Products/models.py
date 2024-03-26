from django.db import models
from uuid import uuid4
from Orders.models import Order, CartOrderItems
from django.core.validators import MinValueValidator, MaxValueValidator
import math 
from Auth.models import User

# Create your models here.
class Product(models.Model) : 
    id = models.UUIDField(primary_key= True, default= uuid4)
    brand = models.CharField(max_length= 100)
    category = models.CharField(max_length= 50)
    description = models.TextField()
    discountPercentage = models.DecimalField(max_digits= 99999, decimal_places= 2)
    price = models.PositiveIntegerField()
    rating = models.DecimalField(max_digits= 99999, decimal_places= 2,validators= [MinValueValidator(0), MaxValueValidator(5)])
    stock = models.IntegerField()
    thumbnail = models.CharField(max_length= 255, null= True)
    title = models.CharField(max_length= 200)
    # orders = models.ForeignKey(Order, on_delete= models.CASCADE, null= True)
    sizes = models.CharField(max_length= 100, null= True)
    colors = models.CharField(max_length= 100, null= True)
    created_at = models.DateTimeField(auto_now_add= True) 
    updated_at = models.DateTimeField(auto_now= True)

    user = models.ForeignKey(User, on_delete= models.CASCADE, null= True)

    @property
    def getDiscountedPrice(self) :
        discountedPrice = self.price * (1 - self.discountPercentage / 100) 
        return math.ceil(float(discountedPrice) - 0.5)
    
    @property
    def isProductInStock(self) : 
        orderItems = CartOrderItems.objects.filter(product__id= self.id)
        number = 0
        for item in orderItems : 
            if not (item.orders.deliveryStatus == 'failed' and item.orders.orderStatus == 'cancelled') : 
                number += item.quantity

        if number >= self.stock : 
            return False 
        return True
    
    def __str__(self) -> str:
        return self.title


class ProductImage(models.Model) : 
    id = models.UUIDField(primary_key= True, default= uuid4)
    product = models.ForeignKey(Product, on_delete= models.CASCADE, related_name= 'product_img')
    image_url= models.CharField(max_length= 255, null= True)
    image = models.ImageField(upload_to= 'Images/products', null= True, blank= True)
    
    created_at = models.DateTimeField(auto_now_add= True) 
    updated_at = models.DateTimeField(auto_now= True) 

    def __str__(self) : 
        return f"{self.product.title}'s Image"

