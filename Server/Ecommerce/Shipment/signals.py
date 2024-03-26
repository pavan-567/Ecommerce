from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Shipment

@receiver(post_save, sender= Shipment)
def ShipmentSignal(sender, instance, created, **kwargs) : 
    pass 