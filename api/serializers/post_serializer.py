from rest_framework import serializers
from api.models import Post


class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = ['body', "author"]

    author = serializers.HyperlinkedRelatedField(view_name="user-detail", read_only=True)