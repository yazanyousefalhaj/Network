from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass


class Post(models.Model):
    body = models.TextField()
    author = models.ForeignKey(User, related_name="posts", on_delete=models.CASCADE)
