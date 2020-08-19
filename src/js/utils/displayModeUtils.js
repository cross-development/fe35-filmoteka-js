import refs from '../controllers/controllerRefs';

let activeNavNode;

function setActiveNavNode(node, activeClass) {
    if (activeNavNode) {
        activeNavNode.classList.remove(activeClass);
    }

    activeNavNode = node;
    activeNavNode.classList.add(activeClass);
}

function displaySearchForm(mode) {
    refs.searchForm.style.display = `${mode}`;
}

function displayPaginationNode(mode) {
    refs.pagination.style.display = `${mode}`;
}

function displayLibraryControls(mode) {
    refs.libraryControls.style.display = mode;
}

function clearResultsView() {
    refs.resultsView.innerHTML = '';
}

function removeLibraryBtnActiveClass() {
    Array.from(refs.libraryControls.children).map(child =>
        child.classList.remove('activeBtn'),
    );
}

function showSectionTitle(title) {
    document.querySelector('.section-title').textContent = title;
}

export default {
    setActiveNavNode,
    displaySearchForm,
    displayLibraryControls,
    clearResultsView,
    removeLibraryBtnActiveClass,
    showSectionTitle,
    displayPaginationNode,
};
