from rest_framework.serializers import ModelSerializer
from .models import Order, CartOrderItems
from rest_framework import serializers
from uuid import UUID
from Products.models import Product
from Shipment.serializers import ShipmentSerializer


class CartOrderItemsSerializer(ModelSerializer) : 
    id = serializers.UUIDField()
    class Meta : 
        model = CartOrderItems
        exclude = ('orders', 'color', )
        read_only_fields = ('product', )

class OrderSerializer(ModelSerializer) :
    orderedProducts = CartOrderItemsSerializer(many= True, write_only= True) # Declared So That It Will Detect Our Key In API Data and Serializes It!
    shipments = serializers.SerializerMethodField()
    cartItems = CartOrderItemsSerializer(many= True, read_only= True, source= 'cart_order')
    username = serializers.CharField(source= 'user.username', read_only= True)
    

    class Meta : 
        model = Order
        exclude = ('user',  )

    def get_shipments(self, obj) : # obj : Current Object 
        return ShipmentSerializer(obj.shipment, many= False).data


    def create(self, validated_data):
        ordered_products = validated_data.pop('orderedProducts')
        
        user = self.context['request'].user
        shipment = validated_data.pop('shipment')

        order = Order.objects.create(**validated_data, user= user, shipment= shipment)


        for item in ordered_products : 
            id = item.pop('id')
            product = Product.objects.get(id= id)
            CartOrderItems.objects.create(**item, orders= order, product= product)

        return order