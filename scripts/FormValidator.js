export class FormValidator {
    constructor(config, checkingForm) {
        this._config = config;
        this._checkingForm = checkingForm;
        this._inputsList = checkingForm.querySelectorAll(this._config.inputSelector);
    }

    _showError (input) {
        const error = document.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.add(this._config.inputErrorClass);
    }
    
    _hideError(input) {
        const error = this._checkingForm.querySelector(`#${input.id}-error`);
        error.textContent = '';
        input.classList.remove(this._config.inputErrorClass);
    }
    
    _checkInputValidity(input) {
        if(!input.validity.valid) {
            this._showError(input);
        } else {
            this._hideError(input);
        }
    }
    
    _setButtonState(button, isActive) {
        if(isActive) {
            button.classList.remove(this._config.inactiveButtonClass);
            button.disabled = false;
        } else {
            button.classList.add(this._config.inactiveButtonClass);
            button.disabled = true;
        }
    }
    
    _setEventListeners(form) {
        const submitButton = form.querySelector(this._config.submitButtonSelector);
    
        this._inputsList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._setButtonState(submitButton, form.checkValidity());
            });
        });
    }
    
    enableValidation() {
        this._setEventListeners(this._checkingForm);
    
        this._checkingForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._inputsList.forEach((input) => {
            this._hideError(input);
        });
    
        const submitButton = this._checkingForm.querySelector(this._config.submitButtonSelector);
        this._setButtonState(submitButton, this._checkingForm.checkValidity());

    }
}