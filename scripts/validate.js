function showError (input, config) {
    const error = document.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass);
}

function hideError(input, config) {
    const error = document.querySelector(`#${input.id}-error`);
    error.textContent = '';
    input.classList.remove(config.inputErrorClass);
}

function checkInputValidity(input, config) {
    if(!input.validity.valid) {
        showError(input, config);
    } else {
        hideError(input, config);
    }
}

function setButtonState(button, isActive, config) {
    if(isActive) {
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(config.inactiveButtonClass);
        button.disabled = true;
    }
}

function setEventListeners(form, config) {
    const inputsList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);

    inputsList.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(input, config);
            setButtonState(submitButton, form.checkValidity(), config);
        });
    });
}

function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach((form) => {
        setEventListeners(form, config);

        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        const submitButton = form.querySelector(config.submitButtonSelector);
        setButtonState(submitButton, form.checkValidity(), config);
    });
}


const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_state_invalid'
};

enableValidation(validationConfig);