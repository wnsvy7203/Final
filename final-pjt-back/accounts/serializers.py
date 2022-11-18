from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'like_movies', 'password', 'email', 'comments',)
        read_only_fields = ('comments', 'like_movies')