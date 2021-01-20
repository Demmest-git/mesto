export default class Card {
    constructor(link, title, buttonDelete, cardSelector, { handleCardClick, handleTrashClick }) {
        this._cardSelector = cardSelector;
        this._link = link;
        this._title = title;
        this._buttonDelete = buttonDelete;
        this._cardTemplate = document.querySelector(this._cardSelector);
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
    }

    _getTemplate() {
        const cardElement = this._cardTemplate.content.cloneNode(true);
        return cardElement;
    }

    // _trashClick(evt){
    //     this._handleTrashClick(this);
    // }

    _trashClick = () => {
        this._handleTrashClick(this);
      };

    deleteCard() {
        console.log(this._element)
        this._element.remove();
        this._element = null;
    }
    
    _handleLikeButton(evt) {
        evt.target.classList.toggle('card__like_active');
    }

    _setEventListeners() {
        this._element.querySelector('.card__like').addEventListener('click', this._handleLikeButton);
        this._elementTrash.addEventListener("click", this._trashClick);
        // this._elementTrash.addEventListener('click', () =>{
        //     this._handleTrashClick(this);
        // });
        // this._buttonDelete.addEventListener('click', this.deleteCard);
        this._cardImage.addEventListener('click', () =>{
            this._handleCardClick(this._link, this._title);
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._elementTrash = this._element.querySelector(".card__trash");
        this._element.querySelector('.card__name').textContent = this._title;
        this._cardImage = this._element.querySelector('.card__image')
        this._cardImage.alt = this._title;
        this._cardImage.src = this._link;
        this._setEventListeners();
        return this._element;
    }
}