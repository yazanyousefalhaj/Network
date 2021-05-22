from django.db import models
from django.contrib.auth.models import AbstractUser


class Post(models.Model):
    body = models.TextField()


class User(AbstractUser):
    pass
