import View from '../view';

const resultNode = document.querySelector('#result');

export default {
    render(item) {
        resultNode.innerHTML = View.render('filmDetails', item);
    },
};
