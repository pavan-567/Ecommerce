# Generated by Django 5.0.2 on 2024-02-21 13:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Orders', '0005_alter_cartorderitems_product'),
    ]

    operations = [
        migrations.AddField(
            model_name='cartorderitems',
            name='color',
            field=models.CharField(choices=[('red', 'red'), ('white', 'white'), ('black', 'black')], max_length=10, null=True),
        ),
    ]
