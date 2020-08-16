
import refs from '../controllers/controllerRefs';

export default {
 

 openModal() {
    refs.modalWindow.style.display="block";

 },
 closeModal () {
    
    refs.modalWindow.style.display="none";
    
 }
}