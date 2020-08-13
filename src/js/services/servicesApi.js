//Core
const API_KEY = '9e07f05bee226a5aad11e2f836e260f9';
const baseURL = 'https://api.themoviedb.org/3';

// Функция получает номер страницы и забирает список популярных фильмов.
// Если не передали номер страницы, по дефолту он = 1
// Ф-ция возвращает массив объектов, описание объекта в файле descriptions_API.txt
const fetchPopularMovies = (page = 1) => {
  return fetch(
      `${baseURL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
    )
    .then(response => response.json())
    .then(data => data.results);
};

// Функция ничего не получает, забирает список жанров.
// Функция возвращает массив объектов, описание объекта в файле descriptions_API.txt
const fetchGenres = () => {
  return fetch(`${baseURL}/genre/movie/list?api_key=${API_KEY}&language=en-U`)
    .then(response => response.json())
    .then(data => data.results);
};

// Функция получает номер страницы и строку запроса, забирает список фильмов по запросу.
// Если не передали номер страницы, по дефолту он = 1
// Ф-ция возвращает массив объектов, описание объекта в файле descriptions_API.txt
const fetchMovies = (searchQuery, page = 1) => {
  return fetch(
      `${baseURL}/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`,
    )
    .then(response => response.json())
    .then(data => data.results);
};

// Функция получает айдишник фильма и возвращает объект с деталями выбранного фильма.
// Описание объекта в файле descriptions_API.txt
const fetchMoviesDetails = movieId => {
  return fetch(
    `${baseURL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
  ).then(response => (response.ok ? response.json() : null));
};

export default {
  fetchPopularMovies,
  fetchGenres,
  fetchMovies,
  fetchMoviesDetails,
};
