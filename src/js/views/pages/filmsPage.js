import View from '../view';

const resultNode = document.querySelector('#result');

export default {
    render(items) {
        resultNode.innerHTML = View.render('films', items);
    },
};
