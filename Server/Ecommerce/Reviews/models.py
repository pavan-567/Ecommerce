from django.db import models
from uuid import uuid4
from Auth.models import User 
from Products.models import Product
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class Review(models.Model) : 
    id = models.UUIDField(default= uuid4, primary_key= True)
    user = models.ForeignKey(User, on_delete= models.CASCADE)
    # 1 Product Can Have Only 1 Review
    product = models.ForeignKey(Product, on_delete= models.CASCADE)
    rating = models.DecimalField(decimal_places= 2, max_digits= 999, validators= [MinValueValidator(0), MaxValueValidator(5)])
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add= True) 
    updated_at = models.DateTimeField(auto_now= True)