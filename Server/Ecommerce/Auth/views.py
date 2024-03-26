from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import *
from rest_framework import status 
import json
from .models import UserProfile, User
from django.contrib.auth.hashers import check_password

# Create your views here.
@api_view(['GET'])
def getRoutes(request) : 
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]

    return Response(routes)

class MyTokenObtainPairView(TokenObtainPairView) : 
    serializer_class = MyTokenObtainPairSerializer


class UserRegistrationView(APIView) : 
    def post(self, request) : 
        serializer = UserRegistrationSerializer(data= request.data)
        if serializer.is_valid() : 
            serializer.save()
            return Response({'msg': "Registration Successful!", "data": serializer.data}, status= status.HTTP_201_CREATED)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProfile(request) : 
    userProfile = UserProfile.objects.get(user= request.user)
    serializer = UserProfileSerializer(instance= userProfile, many= False)
    return Response(serializer.data, status= status.HTTP_200_OK) 
    

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def ChangeProfilePicture(request) :     
    print(request.data['image'], request.data)
    userProfile = UserProfile.objects.get(user= request.user)
    userProfile.image = request.data['image']
    userProfile.save()
    serializer = UserProfileSerializer(instance= userProfile, many= False)
    return Response(serializer.data, status= status.HTTP_202_ACCEPTED)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editProfile(request) :
    profileDetails = json.loads(request.data['profile'])
    image = request.data['image']
    print(profileDetails, image)

    if(image == "/") : 
        print("BINGO!")


    user = request.user 
    userProfile = UserProfile.objects.get(user= user)

    user.username = profileDetails["username"]
    user.email = profileDetails["email"]
    
    userProfile.age = profileDetails["age"]
    userProfile.gender = profileDetails["gender"]
    
    if image != '/' : 
        userProfile.image = image 

    user.save()
    userProfile.save()


    return Response({"msg" : "Successfully Edited"})



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def ChangePassword(request) : 
    print(request.data)
    user = User.objects.get(id = request.user.id)

    check = check_password(request.data['oldPassword'] , user.password)
    if check : 
        if request.data['password'] == request.data['password2'] : 
            user.set_password(request.data['password'])
            user.save()
        else : 
            raise serializers.ValidationError({'message' : "Entered 2 New Passwords Doesn't Match!"})
    else : 
        raise serializers.ValidationError({"message" : "Invalid Old Password!"})

    return Response({"message": "Password Changed Successfully!"}, status= status.HTTP_200_OK)