# Generated by Django 5.0.2 on 2024-02-25 06:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0002_productimage_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productimage',
            name='image',
        ),
    ]
