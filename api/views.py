from django.contrib.auth import authenticate, login, logout, get_user_model
from django.http.response import JsonResponse
from django.db import IntegrityError
from rest_framework import viewsets, permissions, pagination, generics
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from .models import Post
from .model_serializers.post_serializer import PostSerializer
from .model_serializers.user_serializer import UserSerializer


User = get_user_model()


class PostCursorPagination(pagination.CursorPagination):
    ordering = "-date_created"


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PostCursorPagination

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def perform_update(self, serializer):
        if self.get_object().author == self.request.user:
            serializer.save()
        else:
            return Response({"success": False})

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        post = self.get_object()
        if self.request.user in post.likes.all():
            post.likes.remove(self.request.user)
        else:
            post.likes.add(self.request.user)
        post.save()

        return Response({"success": True})


class FollowingListView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PostCursorPagination

    def get_queryset(self):
        following = self.request.user.following.all()
        return Post.objects.filter(author__in=following)


@api_view(["POST"])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(request, username=username, password=password)

    # Check if authentication successful
    if user is not None:
        login(request, user)
        return Response(data=UserSerializer(instance=user, context={"request": request}).data)
    else:
        return JsonResponse({"success": False})

@api_view(["POST"])
def logout_view(request):
    logout(request)
    return JsonResponse({"success": True})


@api_view(["POST"])
def register(request):
    username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email")

    # Attempt to create new user
    try:
        user = User.objects.create_user(username, email, password)
        user.save()
    except IntegrityError:
        return JsonResponse({"success": False})
    login(request, user)
    return Response(UserSerializer(instance=user).data)

@api_view(["GET"])
def me(request):
    if request.user.is_authenticated:
        return Response(data=UserSerializer(instance=request.user, context={"request": request}).data)
    else:
        return JsonResponse({"message": "user is not logged in"})

@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def follow(request):
    followee_id = request.data.get("user_id")
    followee = get_object_or_404(User, pk=followee_id)
    if followee == request.user:
        return Response(data={"success": False})
    if request.user in followee.followers.all():
        followee.followers.remove(request.user)
        return Response(data={"success": True, "removed": True})
    followee.followers.add(request.user)
    followee.save()
    return Response(data={"success": True})
