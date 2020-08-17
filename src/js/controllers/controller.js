//Core
import Model from '../models/model';
import refs from './controllerRefs';
//Settings
import { getDataFromLS } from '../settings/settings';
import { addFilmToLibrary } from '../settings/settings';
import { setActiveNavNode } from '../settings/settings';
import { controlDisplayNode } from '../settings/settings';
import { getFilmsFromLibrary } from '../settings/settings';
//Pages
import homePage from '../pages/homePage';
import filmsPage from '../pages/filmsPage';
import libraryPage from '../pages/libraryPage';
import filmDetailsPage from '../pages/filmDetailsPage';
//Components
import createFilmControls from '../components/filmControls';
import { openWarningModalWindow } from '../components/modalWindow';
import { closeWarningModalWindow } from '../components/modalWindow';
//Refs
refs.scrollUp.addEventListener('click', scrollUp);
refs.movieForm.addEventListener('submit', searchFilms);
refs.pagination.addEventListener('click', paginationNavigation);
refs.modalWindow.addEventListener('click', closeWarningModalWindow);

function scrollUp() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

function searchFilms(e) {
    e.preventDefault();

    const form = e.target;
    const input = form.elements.query;
    const searchQuery = input.value;

    if (!searchQuery) {
        return openWarningModalWindow('Please, enter query.');
    }

    Model.searchQueryMovies = searchQuery;

    Model.fetchMovies().then(resultMoviesData => {
        if (!resultMoviesData || resultMoviesData.length === 0) {
            refs.pagination.style.visibility = 'hidden';
            openWarningModalWindow('No matches found. Make another query.');
        }

        filmsPage.setData(resultMoviesData);
        filmsPage.render();

        refs.pagination.style.display = 'flex';
        refs.pagination.firstElementChild.style.visibility = 'hidden';
    });

    input.value = '';
}

function paginationNavigation(e) {
    const button = e.target;

    if (button.dataset.move === 'next') {
        Model.currentPageNumber += 1;

        Model.fetchMovies().then(resultMoviesData => {
            filmsPage.setData(resultMoviesData);
            filmsPage.render();
            refs.page.textContent = Model.currentPageNumber;
        });

        if (Model.currentPageNumber > 1) {
            refs.pagination.firstElementChild.style.visibility = 'visible';
        }
    }

    if (button.dataset.move === 'prev') {
        Model.currentPageNumber -= 1;

        if (Model.currentPageNumber === 1) {
            refs.pagination.firstElementChild.style.visibility = 'hidden';
        }

        Model.fetchMovies().then(resultMoviesData => {
            filmsPage.setData(resultMoviesData);
            filmsPage.render();
            refs.page.textContent = Model.currentPageNumber;
        });
    }
}

export default {
    async homeRoute() {
        controlDisplayNode('none');
        refs.libraryControls.style.display = 'none';

        const popularMovies = await Model.fetchPopularMovies();
        homePage.setData(popularMovies);
        homePage.render();

        document.querySelector('.section-title').textContent = 'Popular Films';

        setActiveNavNode(refs.homeNavNode, 'active');
    },

    async filmsRoute(params) {
        if (params.id) {
            controlDisplayNode('none');
            refs.libraryControls.style.display = 'none';

            const filmDetails = await Model.fetchMoviesDetails(params.id);

            filmDetailsPage.setData(filmDetails);
            filmDetailsPage.render();

            createFilmControls();
            getDataFromLS('watched', params.id);
            getDataFromLS('queue', params.id);

            const controls = document.querySelector('.film_controls');
            controls.addEventListener('click', e => {
                addFilmToLibrary(e, filmDetails);
            });

            setActiveNavNode(refs.filmsNavNode, 'active');
        } else {
            controlDisplayNode('flex');
            refs.libraryControls.style.display = 'none';
            refs.pagination.style.display = 'none';
            refs.resultsView.innerHTML = '';

            const upcomingFilms = await Model.fetchUpcomingFilm();

            filmsPage.setData(upcomingFilms);
            filmsPage.render();

            document.querySelector('.section-title').textContent =
                'Upcoming Films';

            setActiveNavNode(refs.filmsNavNode, 'active');
        }
    },

    async libraryRoute() {
        controlDisplayNode('none');
        refs.libraryControls.style.display = 'flex';
        refs.resultsView.innerHTML = '';

        Array.from(refs.libraryControls.children).map(child =>
            child.classList.remove('activeBtn'),
        );

        refs.libraryControls.addEventListener('click', e => {
            if (e.target.nodeName !== 'BUTTON') {
                return;
            }

            const existData = getFilmsFromLibrary(e);

            if (!existData) {
                refs.resultsView.innerHTML = '';

                setActiveNavNode(refs.libraryNavNode, 'active');

                return openWarningModalWindow(
                    `${e.target.textContent} list is empty. Add movies there.`,
                );
            }

            libraryPage.setData(existData);
            libraryPage.render();

            setActiveNavNode(e.target, 'activeBtn');
            setActiveNavNode(refs.libraryNavNode, 'active');
        });

        setActiveNavNode(refs.libraryNavNode, 'active');
    },
};
