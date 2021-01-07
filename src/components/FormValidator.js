export default class FormValidator {
    constructor(config, checkingForm) {
        this._config = config;
        this._checkingForm = checkingForm;
        this._inputsList = checkingForm.querySelectorAll(this._config.inputSelector);
        this._submitButton = checkingForm.querySelector(this._config.submitButtonSelector);
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
    
    _setButtonState(isActive) {
        if(isActive) {
            this._submitButton.classList.remove(this._config.inactiveButtonClass);
            this._submitButton.disabled = false;
        } else {
            this._submitButton.classList.add(this._config.inactiveButtonClass);
            this._submitButton.disabled = true;
        }
    }

    _setEventListeners(form) {
    
        this._inputsList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._setButtonState(form.checkValidity());
            });
        });
    }
    
    clearErrors(){
        this._inputsList.forEach((input) => {
            this._hideError (input);
            this._setButtonState(this._checkingForm.checkValidity());
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
    
        
        this._setButtonState(this._checkingForm.checkValidity());

    }
}