from django.shortcuts import render
import requests
from django.http import HttpResponse
import json
from .models import Product, ProductImage
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import ProductSerializer, ProductImageSerializer
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from django.core.paginator import Paginator
from rest_framework import status
from random import randint

from django.db.models import Q

# Create your views here.
# @api_view(['GET'])
# def initializeProducts(request) : 
#     products = requests.get('https://dummyjson.com/products')
#     convProducts = products.json()
#     fetchedProducts = convProducts['products']
#     for product in fetchedProducts : 
#         print(product)
#         newPro = Product.objects.create(title= product['title'], description= product['description'], price= product['price'], discountPercentage= product['discountPercentage'], rating= product['rating'], stock= product['stock'], brand= product['brand'], category= product['category'], thumbnail= product['thumbnail'])
#         for img in product['images'] : 
#             ProductImage.objects.create(product= newPro, image_url= img)
#     return HttpResponse("LOL") 

@api_view(['GET'])
def getProducts(request) : 
    products = Product.objects.all()
    productJSON = ProductSerializer(instance=products, many= True)
    return Response(productJSON.data)



@api_view(['GET'])
def getProductsViaQuery(request) : 
    category = request.GET.get('category', '')
    sort = request.GET.get('sort', 'id')
    page = request.GET.get('page', 1)
    search = request.GET.get('search', '')
    
    # Search By Price
    minPrice = request.GET.get('min', '')
    maxPrice = request.GET.get('max', '')


    category_values = category.split(',')

    filtered_products = None

    if not category and not search : 
        filtered_products = Product.objects.all()
    else : 
        filtered_products = Product.objects.filter(Q(category__in= category_values))
        if len(filtered_products) > 0 : 
            filtered_products = filtered_products.filter(title__icontains= search)
        else : 
            filtered_products = Product.objects.filter(title__icontains= search)

    # Min Max Price
    if minPrice and maxPrice: 
        filtered_products = filtered_products.filter(Q(price__gte= minPrice) & Q(price__lte= maxPrice))
    elif minPrice : 
        filtered_products = filtered_products.filter(Q(price__gte= minPrice))
    elif maxPrice : 
        filtered_products = filtered_products.filter(Q(price__lte= maxPrice))

    # Sorting Logic
    if sort != 'id' : 
        if sort == 'price' : 
            filtered_products = sorted(filtered_products, key= lambda val : val.getDiscountedPrice)
        elif sort == '-price' : 
            filtered_products = sorted(filtered_products, key= lambda val : val.getDiscountedPrice, reverse= True)
        else : 
            filtered_products = filtered_products.order_by(sort)




        

    # Pagination
    
    print(len(filtered_products))
    paginator = Paginator(filtered_products, 10)
    prodData = paginator.get_page(page)


    serializer = ProductSerializer(instance= prodData.object_list, many= True)
    return Response({"products": serializer.data, "pages": paginator.num_pages}, status= status.HTTP_200_OK)




class ProductListView(ListAPIView) : 
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['category']
    # filter_backends = (SearchFilter, )
    # search_fields = ['title', 'brand']


    def get_queryset(self):
        category = self.request.GET.get('category', '')
        sort = self.request.GET.get('sort', '')
        page = self.request.GET.get('page', 1)
        search = self.request.GET.get('search', '')


        category_values = category.split(',')

        filtered_products = None

        if category and sort : 
            if search :   
                filtered_products = Product.objects.filter(category__in= category_values).order_by(sort).filter(title__icontains= search)
            else : 
                filtered_products = Product.objects.filter(category__in= category_values).order_by(sort)
        elif category : 
            category_values = category.split(',')
            filtered_products = Product.objects.filter(category__in= category_values)
        elif sort : 
            # filtered_products = Product.objects.order_by(sort)
            if sort == 'price' : 
                 filtered_products = sorted(Product.objects.all(), key= lambda val : val.getDiscountedPrice)
            else : 
                 filtered_products = sorted(Product.objects.all(), key= lambda val : val.getDiscountedPrice, reverse= True)
        elif search : 
            filtered_products = Product.objects.filter(title__icontains= search)
        elif not category or not sort or not search: 
            filtered_products = Product.objects.all()

        # Pagination
            
        print(len(filtered_products))
        paginator = Paginator(filtered_products, 10)
        prodData = paginator.get_page(page)

        print(paginator.num_pages)

        # return Response({"products": prodData, "pages": paginator.num_pages})
        return prodData

 
    


@api_view(['GET']) 
def getProduct(request, id) :
    product = Product.objects.get(id= id)
    productJSON = ProductSerializer(product, many= False)
    return Response(productJSON.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createProductTest(request) : 
    print(request.data) 
    product = ProductSerializer(data= request.data, many= True)
    if product.is_valid() : 
        print("+=======Im Here========+")
        product.save()
        print(product.data)
        return Response(product.data, status= status.HTTP_201_CREATED)
    print("==================================")
    print(product.errors)
    return Response(product.errors, status= status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createProduct(request) :  
    productData = json.loads(request.data['productData'])
    # print(productData)
    uploadedImages = request.data.getlist('uploadedImages')

    product = Product.objects.create(**productData, user= request.user)
    # product = Product.objects.get(id= "a7278baa-9d95-4486-85cb-4e87eed9a9b6")

    totalImagesLength = len(uploadedImages) - 1
    randImg = randint(0, totalImagesLength)

    i = 0
    for image in uploadedImages : 
        prodImg = ProductImage.objects.create(product= product, image= image)
        prodImg.image_url = f"http://localhost:8000{prodImg.image.url}"
        prodImg.save()

        if i == randImg : 
            product.thumbnail = prodImg.image_url
            product.save()
        i += 1


    return Response({'msg' : "Product Created Successfully!"}, status= status.HTTP_201_CREATED)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editProduct(request, id) : 
    print(request.data)

    product = Product.objects.filter(id= id)

    productData = json.loads(request.data['productData'])
    uploadedImages = request.data.getlist('uploadedImages')

    product.update(**productData)


    for image in uploadedImages : 
        prodImg = ProductImage.objects.create(product= product[0], image= image)

        prodImg.image_url = f"http://localhost:8000{prodImg.image.url}"

        prodImg.save()


    return Response({"msg" : "Successfully Edited"}, status= status.HTTP_202_ACCEPTED)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteProductImage(request, id) : 
    image = ProductImage.objects.get(id= id)
    image.delete()
    return Response({'msg': "Image Deleted Successfully!"}, status= status.HTTP_202_ACCEPTED)
