const Modal = {
    open() {
        //open a modal
        //add a class active to the modal
        document
            .querySelector('.modal-overlay')
            .classList.add('active');
    },
    close() {
        //close a modal
        //remove a class active to the modal
        document
            .querySelector('.modal-overlay')
            .classList.remove('active');
    }
}