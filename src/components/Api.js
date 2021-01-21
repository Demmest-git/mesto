export default class Api {
    constructor({address, token, groupId}) {
        this._address = address;
        this._token = token;
        this._groupId = groupId;
    }
  
    getInitialCards() {
        return fetch(`${this._address}${this._groupId}/cards`, {
            headers: {
                authorization: this._token
            }
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`);
        })
    }

    getUserInfo(){
        return fetch(`${this._address}${this._groupId}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`);
        })
    }

    setUserInfo(item){
        fetch(`${this._address}${this._groupId}/users/me`, {
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
        .then(response => {
            if(response.ok){
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`);
        })
    }

    setUserAvatar(item){
        fetch(`${this._address}${this._groupId}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              avatar: item.avatar
            })
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`);
        })
    }

    addNewCard(item){
        fetch(`${this._address}${this._groupId}/cards`, {
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
        .then(response => {
            if(response.ok){
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`);
        })   
    }
  
    // другие методы работы с API
  }