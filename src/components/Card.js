export default class Card {
    constructor({likes, cardId, name, link, owner}, {handleCardClick, handleLikeClick, handleTrashClick}, cardSelector, userId) {
        this._cardSelector = cardSelector;
        this._link = link;
        this._name = name;
        this._likes = likes;
        this.cardId = cardId;
        this._ownerId = owner._id;
        this._userId = userId;
        this._cardTemplate = document.querySelector(this._cardSelector);
        this._handleLikeClick = handleLikeClick;
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
    }

    _getTemplate() {
        const cardElement = this._cardTemplate.content.querySelector('.card').cloneNode(true);
        return cardElement;
    }

    _trashClick = () => {
        this._handleTrashClick(this);
    }


    deleteCard() {
        this._element.remove();
        this._element = null;
    }
    
    handleLikeButton() {
        this._likeButton.classList.toggle('card__like_active');
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', this._handleLikeClick);
        this._elementTrash.addEventListener("click", this._trashClick);
        this._cardImage.addEventListener('click', () =>{
            this._handleCardClick(this._link, this._name);
        });
    }

    _isLiked() {
        if(this._likeButton.classList.contains('card__like_active')) return true;
        return false;
    }

    isLikedMe() {
        return this._likes.some(like => {
            return like._id === this._userId;
        });
    }

    renderLikes() {
        this._likesCounter.textContent = this._likes.length;
    }

    setCountLikes(count) {
        this._likes = count;
    }

    getIdCard() {
        return this.cardId;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._elementTrash = this._element.querySelector(".card__trash");
        this._cardImage = this._element.querySelector('.card__image');
        this._likeButton = this._element.querySelector('.card__like');
        this._element.querySelector('.card__name').textContent = this._name;
        this._cardImage.alt = this._name;
        this._cardImage.src = this._link;
        if(this._ownerId !== this._userId) {
            this._elementTrash.remove();
        }
        this._likesCounter = this._element.querySelector('.card__like-counter');
        this.renderLikes();
        if (this.isLikedMe()) this._likeButton.classList.add('card__like_active');

        this._setEventListeners();
        return this._element;
    }
}