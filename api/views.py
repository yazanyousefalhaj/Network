from django.contrib.auth import authenticate, login, logout, get_user_model
from django.http.response import JsonResponse
from django.db import IntegrityError
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Post
from api.serializers.post_serializer import PostSerializer
from .serializers.user_serializer import UserSerializer


User = get_user_model()


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


@api_view(["POST"])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(request, username=username, password=password)

    # Check if authentication successful
    if user is not None:
        login(request, user)
        return Response(data=UserSerializer(instance=user).data)
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
        return Response(data=UserSerializer(instance=request.user).data)
    else:
        return JsonResponse({"message": "user is not logged in"})
