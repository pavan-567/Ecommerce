from rest_framework.serializers import ModelSerializer
from .models import Shipment


class ShipmentSerializer(ModelSerializer) : 
    
    class Meta : 
        model = Shipment
        exclude = ('user',)

    def create(self, validated_data):
        user= self.context['request'].user
        return Shipment.objects.create(user= user, **validated_data)

    # def save(self, **kwargs):
    #     user = self.context['user']
    #     print("User :  " , user)
    #     shipment = Shipment.objects.create(**self.validated_data, user= user)
    #     return shipment