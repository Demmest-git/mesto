import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._form = this._popup.querySelector('.popup__form');
      this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    }
  
    _setInputValues(values) {
      this._inputList.forEach((input, i) => {
        input.value = values[i];
      })
    }
  
    _getInputValues() {
      const values = this._inputList.map((input) => {
        return input.value;
      });
      return values;
    } 
  
    _setEventListeners() {
      super._setEventListeners();
      this._form.addEventListener('submit', this._handleFormSubmit);
    }
  
    close() {
      super.close();
      this._form.reset();
      this._form.removeEventListener('submit', this._handleFormSubmit);
    }
  }