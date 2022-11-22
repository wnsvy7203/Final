from django.urls import include, path

from . import views

urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('signup/', include('dj_rest_auth.registration.urls')),
    path('my/', views.my_profile),
    path('genres/', views.like_genres),
]