//Core
const API_KEY = '9e07f05bee226a5aad11e2f836e260f9';
const baseURL = 'https://api.themoviedb.org/3';

export default {
  pageNumber: 1,
  query: '',
  movieId: '',

  fetchPopularMovies() {
    return fetch(
      `${baseURL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.pageNumber}`,
    )
      .then(response => response.json())
      .then(data => data.results);
  },

  fetchGenres() {
    return fetch(`${baseURL}/genre/movie/list?api_key=${API_KEY}&language=en-U`)
      .then(response => response.json())
      .then(data => data.genres);
  },

  fetchMovies() {
    return fetch(
      `${baseURL}/search/movie?api_key=${API_KEY}&language=en-US&query=${this.query}&page=${this.pageNumber}&include_adult=false`,
    )
      .then(response => response.json())
      .then(data => data.results);
  },

  fetchMoviesDetails() {
    return fetch(
      `${baseURL}/movie/${this.movieId}?api_key=${API_KEY}&language=en-US`,
    ).then(response => (response.ok ? response.json() : null));
  },

  incrementPage() {
    this.pageNumber += 1;
  },

  decrementPage() {
    this.pageNumber -= 1;
  },

  resetPage() {
    this.pageNumber = 1;
  },

  // get currentPage() {
  //   this.pageNumber;
  // },

  set searchQuery(str) {
    this.query = str;
  },

  set detailsMovieId(id) {
    this.movieId = id;
  },
};

// Функция получает номер страницы и забирает список популярных фильмов.
// Если не передали номер страницы, по дефолту он = 1
// Ф-ция возвращает массив объектов, описание объекта в файле descriptions_API.txt

// Функция ничего не получает, забирает список жанров.
// Функция возвращает массив объектов, описание объекта в файле descriptions_API.txt

// Функция получает номер страницы и строку запроса, забирает список фильмов по запросу.
// Если не передали номер страницы, по дефолту он = 1
// Ф-ция возвращает массив объектов, описание объекта в файле descriptions_API.txt

// Функция получает айдишник фильма и возвращает объект с деталями выбранного фильма.
// Описание объекта в файле descriptions_API.txt
