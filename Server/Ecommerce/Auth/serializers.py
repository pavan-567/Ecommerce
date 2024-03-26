from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import serializers
from .models import User, UserProfile

    

class UserProfileSerializer(serializers.ModelSerializer) : 
    class Meta : 
        model = UserProfile
        exclude = ('user', )
        read_only_fields = ('image.image_url', )


class UserRegistrationSerializer(serializers.ModelSerializer) : 
    password2 = serializers.CharField(write_only= True)
    userProfile = UserProfileSerializer(many= False, write_only= True)

    class Meta : 
        model = User 
        fields = ['username', 'email', 'password', 'password2', 'userProfile']

        extra_kwargs = {
            'password' : {
                'write_only': True 
            }
        }

    def validate(self, attrs) : 
        password = attrs.get('password')
        password2 = attrs.pop('password2')
        if password != password2 :
            raise serializers.ValidationError("Password's Doesn't Match")
        return attrs 
    
    def create(self, validate_data) : 
        print(validate_data)
        profile = validate_data.pop('userProfile')
        user = User.objects.create_user(**validate_data)
        UserProfile.objects.create(user= user, **profile)
        return user
    



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email 
        token['role'] = user.role
        # ...

        return token