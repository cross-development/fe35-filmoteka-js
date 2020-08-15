function createLibraryControls() {
	const mainSelect = document.querySelector('.main__homePage');

	const libraryControls = document.createElement('div');
	libraryControls.classList.add('header-btn-container');

	const watchedBtn = document.createElement('button');
	watchedBtn.classList.add('header-big-btn');
	watchedBtn.textContent = 'Watched';

	const queueBtn = document.createElement('button');
	queueBtn.classList.add('header-big-btn');
	queueBtn.textContent = 'Queue';

	libraryControls.append(watchedBtn, queueBtn);
	mainSelect.prepend(libraryControls);
}

export default createLibraryControls;
