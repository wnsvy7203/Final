import requests
import os
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

secret_file = os.path.join(BASE_DIR, 'secret.json')

with open(secret_file) as f:
    secrets = json.loads(f.read())

TMDB_API_KEY = '048f1b44f3f7ceec6752538826583420'

movie_list = []

def get_movie_datas():
    global movie_list

    for i in range(1, 51):
        request_url = f'https://api.themoviedb.org/3/movie/popular?api_key={TMDB_API_KEY}&language=ko-KR&page={i}'
        movies = requests.get(request_url).json()

        for movie in movies['results']:
            if movie.get('release_date', ''):
                fields = {
                    'title': movie['title'],
                    'released_date': movie['release_date'],
                    'vote_count': movie['vote_count'],
                    'vote_average': movie['vote_average'],
                    'overview': movie['overview'],
                    'poster_path': movie['poster_path'],
                    'genres': movie['genre_ids'],
                }

                data = {
                    "model": "movies.movie",
                    "fields": fields
                }

                movie_list.append(data)

def get_genre_datas():
    global movie_list

    request_url = f'https://api.themoviedb.org/3/genre/movie/list?api_key={TMDB_API_KEY}&language=ko-KR'
    genres = requests.get(request_url).json()

    for genre in genres['genres']:
        data = {
            "model": "movies.genre",
            "pk": genre['id'],
            "fields": {
                'name': genre['name']
            }
        }

        movie_list.append(data)

get_genre_datas()
get_movie_datas()

file_path = './movies/fixtures/movie_data.json'

with open(file_path, 'w', encoding='utf-8') as file:
    json.dump(movie_list, file, indent="\t", ensure_ascii=False)