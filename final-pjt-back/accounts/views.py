from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from .serializers import UserSerializer


# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def my_profile(request):
    user = get_object_or_404(get_user_model(), pk=request.data.get('user_id'))
    print(request.data)
    serializer = UserSerializer(user)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = get_object_or_404(get_user_model(), pk=request.data.get('user_pk'))
    serializer = UserSerializer(user)

    return Response(serializer.data)
