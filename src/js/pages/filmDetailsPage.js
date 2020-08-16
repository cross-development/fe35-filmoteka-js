import View from '../views/view';

const resultNode = document.querySelector('#result');
let film = [];

export default {
	setData(newFilm) {
		film = newFilm;
	},

	render() {
		resultNode.innerHTML = View.render('filmDetails', film);
	},
};
