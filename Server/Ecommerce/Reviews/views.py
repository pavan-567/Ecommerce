from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from .models import Review
from .serializers import ReviewSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# Create your views here.
@api_view(['GET'])
def getReviews(request) : 
    reviews = Review.objects.all()
    reviewJson = ReviewSerializer(reviews, many= True)
    return Response(reviewJson.data, status= status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createReview(request) : 
    review = ReviewSerializer(data= request.data, many= False, context={'request': request})
    if review.is_valid() : 
        review.save()
        return Response(review.data, status= status.HTTP_201_CREATED)
    return Response(review.errors, status= status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editReview(request) : 
    pass 

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteReview(request)  :
    pass 