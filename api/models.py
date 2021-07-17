from datetime import datetime
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    following = models.ManyToManyField("self", "followers", symmetrical=False)


class Post(models.Model):
    body = models.TextField()
    author = models.ForeignKey(User, related_name="posts", on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, "liked_posts")


