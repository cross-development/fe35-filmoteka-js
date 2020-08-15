import servicesApi from '../services/servicesApi';
import { insertListItems } from '../pages/initialHomePage';

const refs = {
  movieForm: document.querySelector('#form'),
  formInput: document.querySelector('.formInput'),
  formButton: document.querySelector('.formButton'),
  moviesList: document.querySelector('.moviesList'),
  prevMovie: document.querySelector('.prevMovie'),
  pagination: document.querySelector('.pagination'),
  page: document.querySelector('.currentPage'),
};

refs.movieForm.addEventListener('submit', searchFilms);
refs.pagination.addEventListener('click', paginationNavigation);

function fetchFilms() {
  servicesApi
    .fetchMovies()
    .then(insertListItems)
    .catch(e => console.log(e));
}

function searchFilms(e) {
  e.preventDefault();

  const form = e.target;
  const input = form.elements.query;

  if (!input.value.trim()) {
    return console.log('ВЫЗВАТЬ ФЕЧ ПОПУЛЯРНЫХ ФИЛЬМОВ');
  }

  refs.moviesList.innerHTML = '';

  servicesApi.resetPage();
  servicesApi.searchQuery = input.value;

  fetchFilms();

  // input.value = '';
}
// - создаем функция plaginationNavigation принимающую ивент, по id она
// определяет какая из кнопок была нажат и в зависимости от этого по разному
// отрабатывает изменяя при этом глобальные переменные pageNumber, прорисовуя
// его в контейнере в DOM и запускает на пустую строчку inputValue функцию
// fetchPopularMoviesList или fetchFilms;

// - кнопка назад должна исчезать когда текущее количество страниц “1” и
// появляться при “2” и более; - вешаем слушателем функцию plaginationNavigation
// на кнопки вперед и назад.

function paginationNavigation(e) {
  // console.dir(e.currentTarget.firstElementChild);
  const button = e.target;

  if (button.dataset.move === 'next') {
    servicesApi.incrementPage();
    fetchFilms();
  }

  if (button.dataset.move === 'prev') {
    servicesApi.decrementPage();
    // console.log(servicesApi.currentPage);
    // if (servicesApi.currentPage < 2) {
    //   console.dir(button);
    // }
    fetchFilms();
  }
}
