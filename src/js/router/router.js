import Controller from '../controllers/controller';

function getRouteInfo() {
	const hash = location.hash ? location.hash.slice(1) : '';
	const [name, id] = hash.split('/');

	return { name, params: { id } };
}

function handleHash() {
	const { name, params } = getRouteInfo();

	if (name) {
		const routeName = name + 'Route';
		Controller[routeName](params);
	}
}

export default {
	init() {
		//если что-то пойдет не так с раутами - убрать виндов
		window.addEventListener('hashchange', handleHash);
		handleHash();
	},
};
