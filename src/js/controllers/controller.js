import Model from '../models/model';
import refs from './controllerRefs';
import { addFilmToLibrary, getDataFromLS } from '../settings/settings';
import createFilmControls from '../components/filmControls';
import createLibraryControls from '../components/libraryControls';
import homePage from '../pages/homePage';
import filmsPage from '../pages/filmsPage';
import libraryPage from '../pages/libraryPage';
import filmDetailsPage from '../pages/filmDetailsPage';

let activeNavNode;

refs.movieForm.addEventListener('submit', searchFilms);
refs.pagination.addEventListener('click', paginationNavigation);

function setActiveNavNode(node) {
	if (activeNavNode) {
		activeNavNode.classList.remove('active');
	}

	activeNavNode = node;
	activeNavNode.classList.add('active');
}

function controlDisplayNode(mode) {
	refs.searchForm.style.display = `${mode}`;
	refs.pagination.style.display = `${mode}`;
}

//пофиксить получение квери из формы
function searchFilms(e) {
	e.preventDefault();

	const form = e.target;
	const input = form.elements.query;
	const searchQuery = input.value;
	console.log(e.target);
	Model.searchQueryMovies = searchQuery;

	Model.fetchMovies().then(resultMoviesData => {
		console.log(resultMoviesData);

		filmsPage.setData(resultMoviesData);
		filmsPage.render();
	});
	if (!searchQuery.trim()) {
		return console.log('АШИИИБКАА');
	}
	// input.value = '';
}

// пофиксить пагинацию
function paginationNavigation(e) {
	const button = e.target;

	if (button.dataset.move === 'next') {
		Model.pageNumber += 1;
		refs.page.textContent = Model.pageNumber;

		if (Model.pageNumber > 1) {
			refs.pagination.firstElementChild.style.visibility = 'visible';
		}
	}

	if (button.dataset.move === 'prev') {
		Model.pageNumber -= 1;
		refs.page.textContent = Model.pageNumber;

		if (Model.pageNumber === 1) {
			refs.pagination.firstElementChild.style.visibility = 'hidden';
		}
	}
}

export default {
	async homeRoute() {
		controlDisplayNode('none');

		const popularMovies = await Model.fetchPopularMovies();
		homePage.setData(popularMovies);
		homePage.render();

		setActiveNavNode(refs.homeNavNode);
	},

	async filmsRoute(params) {
		if (params.id) {
			controlDisplayNode('none');

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
			refs.pagination.firstElementChild.style.visibility = 'hidden';

			const selectedFilms = await Model.fetchMovies();

			filmsPage.setData(selectedFilms);
			filmsPage.render();

			setActiveNavNode(refs.filmsNavNode);
		}
	},

	async libraryRoute() {
		controlDisplayNode('none');
		//В библиотеке отображается только фильмы из вотчид (пока что)
		const existFavList = localStorage.getItem('watched');

		//исправить! при отсутствии элементов показывает длину массива = 2
		if (!existFavList) {
			return alert('ИСПРАВИТЬ!');
		}

		const existData = JSON.parse(existFavList).map(data => data);
		libraryPage.setData(existData);
		libraryPage.render();

		createLibraryControls();

		setActiveNavNode(refs.libraryNavNode);
	},
};
