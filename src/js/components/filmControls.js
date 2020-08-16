function createFilmControls() {
	const detailsWrapper = document.querySelector('.details_wrapper');

	const filmControls = document.createElement('div');
	filmControls.classList.add('film_controls');

	const watchedBtn = document.createElement('button');
	watchedBtn.classList.add('film_btn');
	watchedBtn.setAttribute('data-status', 'watched');
	watchedBtn.setAttribute('data-marked', 'false');
	watchedBtn.textContent = 'Add to watched';

	const queueBtn = document.createElement('button');
	queueBtn.classList.add('film_btn');
	queueBtn.setAttribute('data-status', 'queue');
	queueBtn.setAttribute('data-marked', 'false');
	queueBtn.textContent = 'Add to queue';

	filmControls.append(watchedBtn, queueBtn);
	detailsWrapper.appendChild(filmControls);
}

export default createFilmControls;
