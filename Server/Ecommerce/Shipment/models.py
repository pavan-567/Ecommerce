from django.db import models
from uuid import uuid4
from Auth.models import User

# Create your models here.
class Shipment(models.Model) : 
    id = models.UUIDField(primary_key= True, default= uuid4)
    
    user = models.ForeignKey(User, on_delete= models.CASCADE)

    address = models.TextField()
    fullName = models.TextField()
    city = models.CharField(max_length= 100)
    state = models.CharField(max_length= 100)
    country = models.CharField(max_length= 100)
    zipCode = models.CharField(max_length= 6)
    mobile = models.CharField(max_length= 15)
    defaultAddress = models.BooleanField(default= False)

    landmark = models.CharField(max_length= 100, null= True)

    shipment_created_at = models.DateTimeField(auto_now_add= True) 
    shipment_updated_at = models.DateTimeField(auto_now= True) 