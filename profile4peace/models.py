from django.db import models

__author__ = 'Nidin'


class User(models.Model):
    serial = models.AutoField(primary_key=True)
    fb_id = models.CharField(max_length=50)
    name = models.CharField(max_length=200)
    country = models.IntegerField(default=-1)
    time = models.IntegerField(default=0)

