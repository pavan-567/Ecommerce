from rest_framework import serializers
from .models import Product, ProductImage




class ProductImageSerializer(serializers.ModelSerializer) : 
    class Meta : 
        model = ProductImage
        fields = ['image_url', 'id']

class ProductSerializer(serializers.ModelSerializer) :
    # Relationship
    images = ProductImageSerializer(read_only= True, many= True, source= 'product_img')
    isInStock = serializers.ReadOnlyField(source= 'isProductInStock')
    uploadedImages = serializers.ListField(
        child=  serializers.ImageField(), write_only= True
    )
    class Meta : 
        model = Product
        fields = "__all__"