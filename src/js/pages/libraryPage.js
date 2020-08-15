import View from '../views/view';

const resultNode = document.querySelector('#result');
let items = [];

export default {
	setData(newItems) {
		items = newItems;
	},

	render() {
		resultNode.innerHTML = View.render('films', items);
	},
};
