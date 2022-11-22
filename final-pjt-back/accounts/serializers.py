from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'movies', 'comments', 'like_genres')
        read_only_fields = ('movies', 'comments', 'like_genres')


class UserGenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'like_genres')
        read_only_fields = ('id', 'like_genres')