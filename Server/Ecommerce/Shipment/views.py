from django.shortcuts import render
from .serializers import ShipmentSerializer
from .models import Shipment
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from uuid import UUID


# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createShipment(request) : 
    serializer = ShipmentSerializer(data= request.data, context= {'request': request})
    if serializer.is_valid() : 
        serializer.save()
        return Response(serializer.data, status= status.HTTP_201_CREATED)
    return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateShipment(request, id) : 
    print(id, request.data)
    shipment = Shipment.objects.get(id= id)
    serializer = ShipmentSerializer(instance= shipment, data=request.data, many= False, context= {'request': request})
    if serializer.is_valid() : 
        serializer.save() 
        return Response(serializer.data, status= status.HTTP_200_OK)
    return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getShipments(request) : 
    shipmentData = Shipment.objects.filter(user= request.user)
    serializer = ShipmentSerializer(shipmentData, many= True)
    return Response(serializer.data, status= status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAdminShipments(request, name) : 
    shipmentData = Shipment.objects.filter(user__username = name)
    serializer = ShipmentSerializer(shipmentData, many= True)
    return Response(serializer.data, status= status.HTTP_200_OK)

@api_view(['GET'])
def getShipment(request, id) : 
    shipment = Shipment.objects.get(id= id)
    serializer = ShipmentSerializer(shipment, many= False)
    return Response(serializer.data, status= status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteShipment(request, id) :
    shipment = Shipment.objects.get(id= id)
    shipment.delete()
    return Response({'msg': "Deleted Shipment Successfully!"}, status= status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def makeDefaultAddr(request, id) : 
    shipmentData = Shipment.objects.filter(user= request.user)
    selectedShipment = None 
    for shipment in shipmentData : 
        if shipment.id ==  UUID(id): 
            shipment.defaultAddress = True 
            selectedShipment = shipment
        else : 
            shipment.defaultAddress = False 
        shipment.save()
    serializer = ShipmentSerializer(selectedShipment, many= False)
    return Response(serializer.data, status= status.HTTP_202_ACCEPTED)
    
