# Generated by Django 5.0.2 on 2024-02-19 18:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Orders', '0004_alter_cartorderitems_id'),
        ('Products', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartorderitems',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_order', to='Products.product'),
        ),
    ]
