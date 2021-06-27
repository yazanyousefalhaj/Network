from rest_framework import serializers
import api.models


class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = api.models.Post
        fields = ['body', "author", "date_created", "likes", "id", "author_name", "author_id"]
        ordering = ['date_created']

    author = serializers.HyperlinkedRelatedField(view_name="user-detail", read_only=True)
    author_name = serializers.SerializerMethodField()
    author_id = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()

    def get_likes(self, obj):
        return obj.likes.count()

    def get_author_name(self, obj):
        return str(obj.author.username)

    def get_author_id(self, obj):
        return obj.author.id

