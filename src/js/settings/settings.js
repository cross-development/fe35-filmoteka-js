function setFilmToLocalStorage(key, filmObj) {
	const existFavList = localStorage.getItem(key);

	if (!existFavList) {
		localStorage.setItem(key, JSON.stringify([filmObj]));
		return;
	}

	const watchedFilms = [...JSON.parse(existFavList), filmObj];
	localStorage.setItem(key, JSON.stringify(watchedFilms));
}

function removeFilmFromLocalStorage(key, filmObj) {
	const existFavList = localStorage.getItem(key);

	if (!existFavList) {
		return setFilmToLocalStorage(key, filmObj);
	}

	const favFilms = [...JSON.parse(existFavList)];
	const filteredFavFilms = favFilms.filter(({ id }) => id !== filmObj.id);

	localStorage.setItem(key, JSON.stringify(filteredFavFilms));
}

function getDataFromLS(key, filmId) {
	const existFavList = localStorage.getItem(key);

	if (existFavList) {
		const favMovies = [...JSON.parse(existFavList)];

		favMovies.find(({ id }) => {
			if (id === Number(filmId)) {
				const targetBtn = document.querySelector(
					`button[data-status="${key}"]`
				);
				return toggleBtnMark(targetBtn, key);
			}
			//если что то пойдет не так - раскомментировать ретерн
			// return false;
		});
	}
}

function toggleBtnMark(target, label) {
	if (target.dataset.marked === 'false') {
		target.dataset.marked = 'true';
		target.textContent = `Remove from ${label}`;
		return true;
	}

	if (target.dataset.marked === 'true') {
		target.dataset.marked = 'false';
		target.textContent = `Add to ${label}`;
		return false;
	}
}

function addFilmToLibrary(e, film) {
	const button = e.target;

	if (button.dataset.status === 'watched') {
		toggleBtnMark(button, 'watched')
			? setFilmToLocalStorage('watched', film)
			: removeFilmFromLocalStorage('watched', film);
	}

	if (button.dataset.status === 'queue') {
		toggleBtnMark(button, 'queue')
			? setFilmToLocalStorage('queue', film)
			: removeFilmFromLocalStorage('queue', film);
	}
}

function getFilmsFromLibrary(e) {
	const key = e.target.dataset.toggle;
	const isWatchedBtnSelect = key === 'watched';
	const isQueueBtnSelect = key === 'queue';

	if (isWatchedBtnSelect || isQueueBtnSelect) {
		const existFavList = localStorage.getItem(key);
		const parsedData = JSON.parse(existFavList);

		if (!existFavList || parsedData.length < 1) {
			return alert('ИСПРАВИТЬ! МАССИВ ПУСТОЙ, НО ДЛИНА 2 ЭЛЕМЕНТА');
		}

		const renderData = parsedData.map(data => data);
		return renderData;
	}
}

export { getDataFromLS, addFilmToLibrary, getFilmsFromLibrary };

// function getFilmsFromLibrary(e) {
//     // console.dir(e.target);
//     // console.dir(e.currentTarget);

//     const button = e.target;
//     const isWatchedBtnSelect = button.dataset.toggle === 'watched';
//     const isQueueBtnSelect = button.dataset.toggle === 'queue';

//     console.log(isQueueBtnSelect, isWatchedBtnSelect);
//     if (button.nodeName !== 'BUTTON') {
//         return;
//     }

//     if (button.dataset.toggle === 'watched') {
//         const existFavList = localStorage.getItem('watched');

//         if (!existFavList || JSON.parse(existFavList).length < 1) {
//             return alert('ИСПРАВИТЬ! МАССИВ ПУСТОЙ, НО ДЛИНА 2 ЭЛЕМЕНТА');
//         }

//         const watchedData = JSON.parse(existFavList).map(data => data);
//         return watchedData;
//     }

//     if (button.dataset.toggle === 'queue') {
//         const existFavList = localStorage.getItem('queue');

//         if (!existFavList || JSON.parse(existFavList).length < 1) {
//             return alert('ИСПРАВИТЬ! МАССИВ ПУСТОЙ, НО ДЛИНА 2 ЭЛЕМЕНТА');
//         }

//         const queueData = JSON.parse(existFavList).map(data => data);

//         return queueData;
//     }
// }
