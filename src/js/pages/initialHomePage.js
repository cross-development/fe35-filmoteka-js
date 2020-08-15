import '../components/searchAndPlaginationHomePage';
import navigation from '../components/navigation';
import servicesApi from '../services/servicesApi';

const renderFilms = [];
const genres = [];

const refs = {
  moviesList: document.querySelector('.moviesList'),
  // homePage: document.querySelector('#js-homePage'),
};

function fetchPopularMoviesList() {
  servicesApi
    .fetchPopularMovies()
    .then(insertListItems)
    .catch(e => console.log(e));
}

function fetchGenres() {
  //   servicesApi.fetchGenres().then(data => console.log(data));
}

export function createCardFunc(movie) {
  const { poster_path, original_title, id, release_date } = movie;

  const listItem = document.createElement('li');
  listItem.classList.add('movieItem');

  const itemLink = document.createElement('a');
  itemLink.classList.add('itemLink');
  itemLink.setAttribute('href', ``);

  const itemImage = document.createElement('img');
  itemImage.classList.add('moviePoster');
  itemImage.setAttribute(
    'src',
    `https://image.tmdb.org/t/p/w500${poster_path}`,
  );
  itemImage.setAttribute('alt', `${original_title}`);

  const itemTitle = document.createElement('span');
  itemTitle.classList.add('itemTitle');
  itemTitle.textContent = `${original_title} (${release_date})`;

  itemLink.append(itemImage);
  itemLink.append(itemTitle);

  listItem.append(itemLink);

  itemLink.addEventListener('click', e => {
    e.preventDefault();
    window['router'].navigate(`movies/${id}`);
    // navigation.activeDetailsPage(id, false);
  });

  return listItem;
}

export function insertListItems(items) {
  let fragment = document.createDocumentFragment();

  items.map(movie => {
    const item = createCardFunc(movie);

    fragment.appendChild(item);
  });

  refs.moviesList.innerHTML = '';
  // refs.homePage.style.display = 'block';
  refs.moviesList.append(fragment);
}

function initialHomePage() {
  fetchPopularMoviesList();
  fetchGenres();
}

export default initialHomePage;

{
  function clearListItems() {
    refs.moviesList.innerHTML = '';
  }

  function monitorButtonStatusText() {}

  // будет добавлять или удалять фильмы из очереди просмотра
  function toggleToQueue() {}

  function toggleToWatched() {}

  function createLibraryCardFunc(imgPath, filmTitle, movieId, voteAverage) {}

  function drawQueueFilmList() {}

  function drawWatchedFilmList() {}
}
