// // Принимает ключ `key` по которому будет произведена выборка, получаем данные из localStorage
// function getFilmsData(key) {
//     try {
//         const serializedState = localStorage.getItem(key);
//         const lsArray =
//             serializedState === null ? undefined : JSON.parse(serializedState);
//         return lsArray;
//     } catch (err) {
//         console.error('Ошибка получения данных из LS: ', err);
//     }
// }

// // Принимает ключ `key` и значение FilmObj(данные фильма) записываем данные в хранилище

// const setFilmsData = (key, filmsObjArr) => {
//     try {
//         const serializedState = JSON.stringify(filmsObjArr);
//         localStorage.setItem(key, serializedState);
//     } catch (err) {
//         console.error('Ошибка записи в LS: ', err);
//         if (err == QUOTA_EXCEEDED_ERR) {
//             alert('Превышен лимит');
//         }
//     }
// };

// //функция проверки наличия фильма в LS
// function isFilmInLS(key, filmObj) {
//     let filmsData = getFilmsData(key) || [];
//     const film = filmsData.find(
//         elem => elem.poster_path === filmObj.poster_path,
//     );

//     if (film) return filmsData.indexOf(film);
//     else return false;
// }

// // содержимое MyLib  - передаем ключ - строка просмотренный('watched') или к просмотру('queue')
// function openMyLib(key) {
//     // получаем данные из хранилища
//     let filmsData = getFilmsData(key);

//     // формируем данные для вывода
//     if (filmsData !== null) {
//         // console.log(key);
//         // console.log(filmsData);

//         const array_size = 20;

//         let sliced_filmsData = [];

//         for (let i = 0; i < filmsData.length; i += array_size) {
//             sliced_filmsData.push(filmsData.slice(i, i + array_size));
//         }
//         // console.log(sliced_filmsData);
//         return sliced_filmsData;
//     }
// }

// //Функция удаления фильма из MyLib

// function deleteFilm(key, filmObj) {
//     const toDelIdx = isFilmInLS(key, filmObj);
//     // получаем данные из Milib
//     let filmsData = getFilmsData(key);
//     // console.log(filmsData);

//     //удаляем из массива фильм
//     filmsData.splice(toDelIdx, 1);
//     //Чистим LS
//     localStorage.removeItem(key);

//     //записываем обновленный массив в LS
//     setFilmsData(key, filmsData);
// }

//DONE
function setFilmToLocalStorage(key, filmObj) {
	const existFavList = localStorage.getItem(key);

	if (!existFavList) {
		localStorage.setItem(key, JSON.stringify([filmObj]));
		// this.setFavoriteMovie();
		return;
	}

	const watchedFilms = [...JSON.parse(existFavList), filmObj];
	localStorage.setItem(key, JSON.stringify(watchedFilms));
	// this.setFavoriteMovie();
}
//DONE
function removeFilmFromLocalStorage(key, filmObj) {
	const existFavList = localStorage.getItem(key);

	if (!existFavList) {
		return setFilmToLocalStorage(key, filmObj);
	}

	const favFilms = [...JSON.parse(existFavList)];
	const filteredFavFilms = favFilms.filter(({ id }) => id !== filmObj.id);

	localStorage.setItem(key, JSON.stringify(filteredFavFilms));
	// this.setFavoriteMovie();
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

export {
	// setFilmToLocalStorage,
	// removeFilmFromLocalStorage,
	getDataFromLS,
	addFilmToLibrary,
	// setFilmsData,
	// getFilmsData,
	// openMyLib,
	// isFilmInLS,
	// deleteFilm,
};
