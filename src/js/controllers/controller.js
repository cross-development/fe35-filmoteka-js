//Core
import Model from '../models/model';
import refs from './controllerRefs';
//Settings
import { getDataFromLS } from '../settings/settings';
import { addFilmToLibrary } from '../settings/settings';
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

refs.movieForm.addEventListener('submit', searchFilms);
refs.pagination.addEventListener('click', paginationNavigation);
refs.scrollUp.addEventListener('click', scrollUp);
refs.modalWindow.addEventListener('click', closeWarningModalWindow);

let activeNavNode;

function scrollUp() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

function setActiveNavNode(node) {
    if (activeNavNode) {
        activeNavNode.classList.remove('active');
    }
    closeWarningModalWindow()
    activeNavNode = node;
    activeNavNode.classList.add('active');
}

function controlDisplayNode(mode) {
    refs.searchForm.style.display = `${mode}`;
    refs.pagination.style.display = `${mode}`;
}

function searchFilms(e) {
    e.preventDefault();

    const form = e.target;
    const input = form.elements.query;
    const searchQuery = input.value;

    if (!searchQuery) {
        return openWarningModalWindow('Enter query.');
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

        setActiveNavNode(refs.homeNavNode);
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

            setActiveNavNode(refs.filmsNavNode);
        } else {
            controlDisplayNode('flex');
            refs.libraryControls.style.display = 'none';
            refs.pagination.style.display = 'none';
            refs.resultsView.innerHTML = '';

            setActiveNavNode(refs.filmsNavNode);
        }
    },

    async libraryRoute() {
        controlDisplayNode('none');
        refs.libraryControls.style.display = 'flex';
        refs.resultsView.innerHTML = '';

        refs.libraryControls.addEventListener('click', e => {
            if (e.target.nodeName !== 'BUTTON') {
                return;
            }

            const existData = getFilmsFromLibrary(e);

            if (!existData) {
                refs.resultsView.innerHTML = '';
                return openWarningModalWindow('Library section is empty. Add movies there.');
            }

            libraryPage.setData(existData);
            libraryPage.render();
        });

        setActiveNavNode(refs.libraryNavNode);
    },
};
