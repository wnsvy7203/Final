from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import User
from .serializers import UserGenreSerializer, UserSerializer


# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def my_profile(request):
    user = request.user

    serializer = UserSerializer(user)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_genres(request):
    user = request.user
    data = request.data

    print(data)

    for i in data['push_genre']:
        # serializer = UserGenreSerializer(id=user.id, data=i)
        # print(serializer)
        # serializer.save()
        user.like_genres.add(i)
        pass