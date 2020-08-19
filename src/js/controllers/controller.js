//Core
import Model from '../models/model';
import refs from './controllerRefs';
//Utils
import displayModeUtils from '../utils/displayModeUtils';
import localStorageUtils from '../utils/localStorageUtils';
//Pages
import homePage from '../views/pages/homePage';
import filmsPage from '../views/pages/filmsPage';
import libraryPage from '../views/pages/libraryPage';
import filmDetailsPage from '../views/pages/filmDetailsPage';
//Components
import scrollUp from '../views/components/scrollUp';
import createFilmControlsSection from '../views/components/filmControls';
import { openWarningModalWindow } from '../views/components/modalWindow';
import { closeWarningModalWindow } from '../views/components/modalWindow';
//Refs
refs.scrollUp.addEventListener('click', scrollUp);
refs.movieForm.addEventListener('submit', searchFilms);
refs.pagination.addEventListener('click', paginationNavigation);
refs.modalWindow.addEventListener('click', closeWarningModalWindow);

function searchFilms(e) {
    e.preventDefault();

    const formInput = e.target.elements.query;
    const searchQuery = formInput.value;

    if (!searchQuery) {
        return openWarningModalWindow('Please, enter query.');
    }

    Model.searchQueryMovies = searchQuery;

    fetchFilmsByQuery();

    refs.pagination.style.display = 'flex';
    refs.pagination.firstElementChild.style.visibility = 'hidden';

    formInput.value = '';
}

function paginationNavigation(e) {
    const button = e.target;

    if (button.dataset.move === 'next') {
        Model.currentPageNumber += 1;

        fetchFilmsByQuery();
        refs.page.textContent = Model.currentPageNumber;

        if (Model.currentPageNumber > 1) {
            refs.pagination.firstElementChild.style.visibility = 'visible';
        }
    }

    if (button.dataset.move === 'prev') {
        Model.currentPageNumber -= 1;

        fetchFilmsByQuery();
        refs.page.textContent = Model.currentPageNumber;

        if (Model.currentPageNumber === 1) {
            refs.pagination.firstElementChild.style.visibility = 'hidden';
        }
    }
}

async function fetchFilmsByQuery() {
    await Model.getFetchFilms().then(resultFilmsData => {
        if (!resultFilmsData || resultFilmsData.length === 0) {
            refs.pagination.style.visibility = 'hidden';
            return openWarningModalWindow('No matches found. Make another query.');
        }

        filmsPage.render(resultFilmsData);
    });
}

export default {
    async homeRoute() {
        displayModeUtils.displaySearchForm('none');
        displayModeUtils.displayPaginationNode('none');
        displayModeUtils.displayLibraryControls('none');

        const popularFilms = await Model.getFetchPopularFilms();

        if (!popularFilms) {
            return openWarningModalWindow(
                'Something went wrong! Please, try again later',
            );
        }

        homePage.render(popularFilms);

        displayModeUtils.showSectionTitle('Popular Films');
        displayModeUtils.setActiveNavNode(refs.homeNavNode, 'active');
    },

    async filmsRoute(params) {
        if (params.id) {
            displayModeUtils.displaySearchForm('none');
            displayModeUtils.displayPaginationNode('none');
            displayModeUtils.displayLibraryControls('none');

            const filmDetails = await Model.getFetchFilmDetails(params.id);

            if (!filmDetails) {
                return openWarningModalWindow(
                    'Something went wrong! Please try again later',
                );
            }

            filmDetailsPage.render(filmDetails);

            createFilmControlsSection();

            localStorageUtils.getDataFromLS('watched', params.id);
            localStorageUtils.getDataFromLS('queue', params.id);

            const controls = document.querySelector('.film_controls');
            controls.addEventListener('click', e =>
                localStorageUtils.addFilmToLibrary(e, filmDetails),
            );

            displayModeUtils.setActiveNavNode(refs.filmsNavNode, 'active');
        } else {
            displayModeUtils.displaySearchForm('flex');
            displayModeUtils.displayLibraryControls('none');
            displayModeUtils.displayPaginationNode('none');
            displayModeUtils.clearResultsView();

            const upcomingFilms = await Model.getFetchUpcomingFilms();

            if (!upcomingFilms) {
                return openWarningModalWindow(
                    'Something went wrong! Please try again later',
                );
            }

            filmsPage.render(upcomingFilms);

            displayModeUtils.showSectionTitle('Upcoming Films');
            displayModeUtils.setActiveNavNode(refs.filmsNavNode, 'active');
        }
    },

    async libraryRoute() {
        displayModeUtils.displaySearchForm('none');
        displayModeUtils.displayPaginationNode('none');
        displayModeUtils.displayLibraryControls('flex');
        displayModeUtils.clearResultsView();
        displayModeUtils.removeLibraryBtnActiveClass();

        refs.libraryControls.addEventListener('click', e => {
            if (e.target.nodeName !== 'BUTTON') {
                return;
            }

            const existData = localStorageUtils.getFilmsFromLibrary(e);

            if (!existData) {
                displayModeUtils.clearResultsView();
                displayModeUtils.setActiveNavNode(refs.libraryNavNode, 'active');

                return openWarningModalWindow(
                    `${e.target.textContent} list is empty. Add movies there.`,
                );
            }

            libraryPage.render(existData);

            displayModeUtils.setActiveNavNode(e.target, 'activeBtn');
            displayModeUtils.setActiveNavNode(refs.libraryNavNode, 'active');
        });

        displayModeUtils.setActiveNavNode(refs.libraryNavNode, 'active');
    },
};
