from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from movies import views

urlpatterns = [
    path('movies/', views.movie_list),
    path('comments/', views.comment_list),
    path('comments/<int:comment_pk>/', views.comment_detail),
    path('movies/<int:movie_pk>/comments/', views.comment_create),
    path('genres/', views.genre_list),
    path('genres/<int:genre_pk>/', views.get_genre),
    path('movies/<int:movie_pk>/like_users', views.movie_like_users),
    # # 필수 작성
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    # # optional UI
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]
