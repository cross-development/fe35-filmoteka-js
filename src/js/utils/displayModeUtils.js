import refs from '../controllers/controllerRefs';

let activeNavNode;

function setActiveNavNode(node, activeClass) {
    if (activeNavNode) {
        activeNavNode.classList.remove(activeClass);
    }

    activeNavNode = node;
    activeNavNode.classList.add(activeClass);
}

function controlDisplayNode(mode) {
    refs.searchForm.style.display = `${mode}`;
    refs.pagination.style.display = `${mode}`;
}

function displayLibraryControls(mode) {
    refs.libraryControls.style.display = mode;
}

function clearResultsView() {
    refs.resultsView.innerHTML = '';
}

export {
    setActiveNavNode,
    controlDisplayNode,
    displayLibraryControls,
    clearResultsView,
};
