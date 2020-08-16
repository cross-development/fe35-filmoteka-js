import refs from '../controllers/controllerRefs';

export function openWarningModalWindow() {
    refs.modalWindowText.textContent = 'No matches found. Make another query';
    refs.modalWindow.style.display = 'block';
}

export function closeWarningModalWindow() {
    refs.modalWindowText.textContent = '';
    refs.modalWindow.style.display = 'none';
}
