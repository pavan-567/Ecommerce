from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from operator import itemgetter
from .models import Order 
from uuid import UUID
import stripe 
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import redirect
from django.conf import settings
from Shipment.models import Shipment
from .serializers import OrderSerializer

# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrders(request) :    
    orders = Order.objects.filter(user= request.user)
    serializer = OrderSerializer(orders, many= True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllOrders(request) : 
    if not request.user.role : 
        return Response({'Response' : 'Only Admin\'s Can Access The Data'}, status= status.HTTP_403_FORBIDDEN)
    orders = Order.objects.exclude(user= request.user)
    serializer = OrderSerializer(orders, many= True)
    return Response(serializer.data, status= status.HTTP_200_OK) 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrder(request, id) : 
    order = Order.objects.get(id= id)
    serializer = OrderSerializer(order, many= False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def placeOrder(request) :
    serializer = OrderSerializer(data= request.data, context= {'request' : request})
    if serializer.is_valid() : 
        serializer.save()
        return Response(serializer.data, status= status.HTTP_201_CREATED)
    return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def editOrder(request, id) :
    print(request.data)
    order = Order.objects.get(id= id)
    order.paymentStatus = request.data['paymentStatus']
    order.orderStatus = request.data['orderStatus']
    order.deliveryStatus = request.data['deliveryStatus']
    currShipment = Shipment.objects.get(id = request.data['shipment'])
    order.shipment = currShipment
    if request.data.get('deliveryDate') : 
        order.deliveryDate = request.data['deliveryDate']
    order.save()
    serializer = OrderSerializer(order, many= False)
    return Response(serializer.data, status= status.HTTP_202_ACCEPTED)
    # serializer = OrderSerializer(data= request.data, instance= order, many= False)

    # if serializer.is_valid() : 
    #     serializer.save()
    #     return Response(serializer.data, status= status.HTTP_202_ACCEPTED) 
    # return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)


# Stripe
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def stripeCheckout(request) :
    # API : Product ID, Price, Quantity
    print(request.data) # API Structure : => [{productId: , discountedPrice, quantity, images}] 
    stripe.api_key = settings.STRIPE_PRIVATE_KEY
    checkout_session = stripe.checkout.Session.create(
        payment_method_types= ['card'],
        line_items= request.data,
        mode= 'payment',
        success_url= 'http://localhost:5173/checkout' + '?status=success',
        cancel_url= 'http://localhost:5173/checkout' + '?status=cancel'
    ) 
    print(checkout_session.url)
    return Response(checkout_session.url, status= status.HTTP_303_SEE_OTHER)


