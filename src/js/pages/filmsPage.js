import View from '../views/view';

const resultNode = document.querySelector('#result');

let items = [];

export default {
	setData(filmsItems) {
		items = filmsItems;
	},

	render() {
		resultNode.innerHTML = View.render('films', items);
	},
};
