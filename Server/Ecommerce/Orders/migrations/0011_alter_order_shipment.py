# Generated by Django 5.0.2 on 2024-02-25 12:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Orders', '0010_order_deliverydate'),
        ('Shipment', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='shipment',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='shipment_address', to='Shipment.shipment'),
        ),
    ]
