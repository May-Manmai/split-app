function clearErrors() {
    const error = document.getElementById('error');
    if (error) {
        error.remove();
    }
}

function clearInputError() {
    const inputError = document.querySelectorAll('.is-invalid');
    if(inputError.length > 0) {
        inputError.forEach(error => {
            error.classList.remove('form-control', 'is-invalid');
        });
    }
}
