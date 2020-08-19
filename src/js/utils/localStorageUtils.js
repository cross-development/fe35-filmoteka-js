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
                    `button[data-status="${key}"]`,
                );

                return toggleBtnMark(targetBtn, key);
            }
        });
    }
}

function toggleBtnMark(target, label) {
    if (target.dataset.marked === 'false') {
        target.dataset.marked = 'true';
        target.classList.add('activeBtn');
        target.textContent = `Remove from ${label}`;
        return true;
    }

    if (target.dataset.marked === 'true') {
        target.dataset.marked = 'false';
        target.classList.remove('activeBtn');
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

        const targetBtn = document.querySelector(
            `button[data-toggle="${key === 'watched' ? 'queue' : 'watched'}"]`,
        );
        targetBtn.classList.remove('activeBtn');

        if (!existFavList || parsedData.length < 1) {
            localStorage.removeItem(key);
            return false;
        }

        const renderData = parsedData.map(data => data);
        return renderData;
    }
}

export default {
    getDataFromLS,
    addFilmToLibrary,
    getFilmsFromLibrary,
};
