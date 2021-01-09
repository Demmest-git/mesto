export default class Popup {

    constructor( popupSelector ) {
      this._popup = document.querySelector(popupSelector);
      this._closeButton = this._popup.querySelector('.popup__button-close');
      this._handleEscClose = this._handleEscClose.bind(this);
      // this.setEventListeners()
    }

    _handleEscClose(evt){
      if (evt.key === 'Escape') {
         this.close();
      }
    }

    _handleOverlayClose(evt){
      if (evt.target.classList.contains('popup')) {
         this.close();
      }
    }

    _handleCloseButton(){
      this.close();
    }
  
    open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
    }
  
    close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
    }
  
    setEventListeners() {
      this._closeButton.addEventListener("click", (evt) => {
        this.close();
      });
      this._popup.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("popup")) {
          this.close();
        }
      });
    }
  }