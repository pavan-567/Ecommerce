# Generated by Django 5.0.2 on 2024-02-19 18:08

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Orders', '0003_cartorderitems_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartorderitems',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False),
        ),
    ]
