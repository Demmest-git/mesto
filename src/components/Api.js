export default class Api {
    constructor({address, token, groupId}) {
        this._address = address;
        this._token = token;
        this._groupId = groupId;
    }

    _getResponse(res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getInitialCards() {
        return fetch(`${this._address}${this._groupId}/cards`, {
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._getResponse(res));
    }

    getUserInfo(){
        return fetch(`${this._address}${this._groupId}/users/me`, {
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._getResponse(res));
    }

    setUserInfo(item){
        return fetch(`${this._address}${this._groupId}/users/me`, {
            method: 'PATCH',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: item.name,
              about: item.decoration
            })
        })
            .then(res => this._getResponse(res));
    }

    setUserAvatar(item){
        return fetch(`${this._address}${this._groupId}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              avatar: item.avatar
            })
        })
            .then(res => this._getResponse(res));
    }

    addNewCard(item){
        return fetch(`${this._address}${this._groupId}/cards`, {
            method: 'POST',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: item.addName,
                link: item.link
            })
        })
            .then(res => this._getResponse(res));
    }
  
    deleteCard(element) {
        return fetch(`${this._address}${this._groupId}/cards/${element.cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._getResponse(res));
    }

    likeCard(cardId) {
        return fetch(`${this._address}${this._groupId}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._getResponse(res));
    }


    deleteLike(cardId) {
        return fetch(`${this._address}${this._groupId}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._getResponse(res));
    }
  }