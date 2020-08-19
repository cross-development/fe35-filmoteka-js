import refs from '../../controllers/controllerRefs';

export function openWarningModalWindow(modalWindowTextContent) {
    refs.modalWindowText.textContent = modalWindowTextContent;
    refs.modalWindow.style.display = 'block';
}

export function closeWarningModalWindow() {
    refs.modalWindowText.textContent = '';
    refs.modalWindow.style.display = 'none';
}
