import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._form = this._popup.querySelector('.popup__form');
      this._submitButton = this._popup.querySelector('.popup__button');
      this._defaultButtonText = this._submitButton.textContent;
      this._inputList = this._form.querySelectorAll('.popup__input');
    }
  
    _setInputValues(values) {
      this._inputList.forEach((input, i) => {
        input.value = values[i];
      })
    }
  
    _getInputValues() {
      this._formValues = {};
      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });
      return this._formValues;
    } 
  
    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.close();
      });
    } 
  
    close() {
      super.close();
      this._form.reset();
    }
    
    setBtnText(text) {
      this._submitButton.textContent = text;
    }

    setDefaultBtnText() {
      this._submitButton.textContent = this._defaultButtonText;
    }
  }