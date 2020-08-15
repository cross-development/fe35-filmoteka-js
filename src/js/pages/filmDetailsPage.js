import servicesApi from '../services/servicesApi';
import detailsPage from '../../templates/pages/detailsPage.hbs';

const refs = {
  main: document.querySelector('#main'),
  homePage: document.querySelector('#js-homePage'),
};

function fetchMovieDetail() {
  servicesApi
    .fetchMoviesDetails()
    .then(showDetails)
    .catch(e => console.log(e));
}

function showDetails(selectFilm) {
  const markup = detailsPage(selectFilm);

  refs.homePage.style.display = 'none';
  refs.main.insertAdjacentHTML('beforeend', markup);
  //   monitorButtonStatusText();
}

function filmDetailsPage(movieId) {
  console.log(movieId);
  servicesApi.movieId = movieId;

  fetchMovieDetail();
}

export default filmDetailsPage;
