from rest_framework import serializers
import api.models


class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = api.models.Post
        fields = ['body', "author", "date_created", "likes", "id", "author_name", "author_id", "liked_by_user"]
        ordering = ['date_created']

    author = serializers.HyperlinkedRelatedField(view_name="user-detail", read_only=True)
    author_name = serializers.SerializerMethodField()
    author_id = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    liked_by_user = serializers.SerializerMethodField()

    def get_likes(self, obj):
        return obj.likes.count()

    def get_liked_by_user(self, obj):
        return self.context["request"].user in obj.likes.all()

    def get_author_name(self, obj):
        return str(obj.author.username)

    def get_author_id(self, obj):
        return obj.author.id

