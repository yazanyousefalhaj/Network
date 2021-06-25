from rest_framework import serializers
from django.contrib.auth import get_user_model
import api.model_serializers.post_serializer
import api.models


class UserPostsSerializer(api.model_serializers.post_serializer.PostSerializer):
    def filter_queryset(self, request, queryset, view):
        return queryset.filter(author=request.user)


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'is_staff', "following", "followers", "id", "posts"]

    following = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    posts = UserPostsSerializer(read_only=True, many=True)

    def get_following(self, obj):
        return obj.following.count()

    def get_followers(self, obj):
        return obj.followers.count()
