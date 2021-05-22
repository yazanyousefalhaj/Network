from django.contrib.auth import get_user_model
from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.views.decorators.http import require_POST
from django.db import IntegrityError

from .serializers.user_serializer import UserSerializer


User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@require_POST
def login_view(request):
    # Attempt to sign user in
    username = request.POST["username"]
    password = request.POST["password"]
    user = authenticate(request, username=username, password=password)

    # Check if authentication successful
    if user is not None:
        login(request, user)
        return JsonResponse({"success": True})
    else:
        return JsonResponse({"success": False})

@require_POST
def logout_view(request):
    logout(request)
    return JsonResponse({"success": True})


@require_POST
def register(request):
    username = request.POST["username"]
    email = request.POST["email"]

    # Ensure password matches confirmation
    password = request.POST["password"]
    confirmation = request.POST["confirmation"]
    if password != confirmation:
        return JsonResponse({"success": False})

        # Attempt to create new user
    try:
        user = User.objects.create_user(username, email, password)
        user.save()
    except IntegrityError:
        return JsonResponse({"success": False})
    login(request, user)
    return JsonResponse({"success": True})