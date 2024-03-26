from django.db import models
from django.contrib.auth.models import AbstractUser
from uuid import uuid4 


GENDER_CHOICES = (
    ('male', 'male'),
    ('female', 'female'),
    ('other', 'other')
)


# Create your models here.
class User(AbstractUser) : 
    CUSTOMER = 0
    ADMIN = 1

    ROLE_CHOICES = (
        (CUSTOMER, 'customer'),
        (ADMIN, 'admin')
    )

    id = models.UUIDField(primary_key=True, default=uuid4)
    email = models.EmailField(unique= True)
    role = models.PositiveSmallIntegerField(choices= ROLE_CHOICES, blank= True, null= True, default= CUSTOMER)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    
class UserProfile(models.Model) : 
    user = models.OneToOneField(User, on_delete= models.CASCADE)
    gender = models.CharField(max_length= 10, choices= GENDER_CHOICES)
    age = models.IntegerField()
    # image = models.CharField(max_length= 100, default= 'https://wallpapers.com/images/hd/animated-young-girl-nezuko-7gjo3tyerpb2dyy1.webp')
    image = models.ImageField(upload_to= "Images/profile", null= True, blank= True, default= 'default.jpg')
    created_at = models.DateTimeField(auto_now_add= True) 
    updated_at = models.DateTimeField(auto_now= True) 


