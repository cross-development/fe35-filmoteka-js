import filmDetailsPage from '../pages/filmDetailsPage';

//показывает страницу детальной отрисовки фильма и прячет остальные
function activeDetailsPage(movieId, itsLibraryFilm) {
  filmDetailsPage(movieId, itsLibraryFilm);
}

//показывает домашнюю страницу и прячет остальные
function activeHomePage() {}

//показывает страницу с библиотекой и прячет остальные
function activeLibraryPage() {}

export default {
  activeDetailsPage,
  activeHomePage,
  activeLibraryPage,
};
