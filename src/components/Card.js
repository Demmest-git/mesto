export default class Card {
    constructor(link, title, cardSelector, { handleCardClick }) {
        this._cardSelector = cardSelector;
        this._link = link;
        this._title = title;
        this._cardTemplate = document.querySelector(this._cardSelector);
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = this._cardTemplate.content.cloneNode(true);
        return cardElement;
    }

    _deleteCard(evt) {
        evt.target.closest('.card').remove();
    }
    
    _handleLikeButton(evt) {
        evt.target.classList.toggle('card__like_active');
    }

    _setEventListeners() {
        this._element.querySelector('.card__like').addEventListener('click', this._handleLikeButton);
        this._element.querySelector('.card__trash').addEventListener('click', this._deleteCard);
        this._cardImage.addEventListener('click', () =>{
            this._handleCardClick(this._link, this._title);
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.card__name').textContent = this._title;
        this._cardImage = this._element.querySelector('.card__image')
        this._cardImage.alt = this._title;
        this._cardImage.src = this._link;
        this._setEventListeners();
        return this._element;
    }
}