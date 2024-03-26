from rest_framework.serializers import ModelSerializer
from .models import Review
from rest_framework import serializers


class ReviewSerializer(ModelSerializer) : 
    username = serializers.CharField(source= 'user.username', read_only= True)
    image = serializers.CharField(source= 'user.userprofile.image', read_only= True)
    class Meta : 
        model = Review
        exclude = ('user', )

    def create(self, validated_data):
        print(validated_data)
        user = self.context['request'].user
        return Review.objects.create(**validated_data, user= user)
    