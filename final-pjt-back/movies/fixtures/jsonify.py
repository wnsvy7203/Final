import requests
import json
import os

API_KEY = str(os.getenv('VUE_APP_TMDB_API_KEY'))

def get_movie_datas():
    movie_list = []

    for i in range(1, 501):
        request_url = f'<https://api.themoviedb.org/3/movie/popular?api_key={API_KEY}&language=ko-KR&page={i}>'
        movies = requests.get(request_url).json()

        for movie in movies['results']:
            if movie.get('release_data', ''):
                data = {
                    'movie_id': movie['id'],
                    'title': movie['title'],
                    'released_date': movie['release_date'],
                    'popularity': movie['popularity'],
                    'vote_avg': movie['vote_average'],
                    'overview': movie['overview'],
                    'poster_path': movie['poster_path'],
                    'genres': movie['genre_ids']
                }

                movie_list.append(data)
    
    json_data = {
        'name': 'movie data',
        'data': data
    }

    with open('movie_data.json', 'w', encoding='utf-8') as w:
        json.dump(json_data, w, indent='\\t', ensure_ascii=False)

get_movie_datas()