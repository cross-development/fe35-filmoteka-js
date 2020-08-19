function createFilmControls() {
    const controls = document.createElement('div');
    controls.classList.add('film_controls');

    return controls;
}

function createWatchedButton() {
    const button = document.createElement('button');
    button.classList.add('film_btn');
    button.setAttribute('data-status', 'watched');
    button.setAttribute('data-marked', 'false');
    button.textContent = 'Add to watched';

    return button;
}

function createQueueButton() {
    const button = document.createElement('button');
    button.classList.add('film_btn');
    button.setAttribute('data-status', 'queue');
    button.setAttribute('data-marked', 'false');
    button.textContent = 'Add to queue';

    return button;
}

function createFilmControlsSection() {
    const detailsWrapper = document.querySelector('.details_wrapper');

    const filmControls = createFilmControls();
    const watchedBtn = createWatchedButton();
    const queueBtn = createQueueButton();

    filmControls.append(watchedBtn, queueBtn);
    detailsWrapper.appendChild(filmControls);
}

export default createFilmControlsSection;
