import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector, imageSelector, titleSelector) {
    super(popupSelector);
    this._imageSelector = imageSelector;
    this._titleSelector = titleSelector;
    this._popupPicture = this._popup.querySelector(this._imageSelector);
    this._popupTitle = this._popup.querySelector(this._titleSelector);
    this.setEventListeners();

  }
  
   open(link, title) {
    this._popupPicture.src = link;
    this._popupPicture.alt = title;
    this._popupTitle.textContent = title;
    super.open();
  }
}