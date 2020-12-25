const name = document.querySelector(".profile__name");
const decoration = document.querySelector(".profile__decoration");
const formElement = document.querySelector(".popup__form_type_profile");
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_profile');
const buttonCloseList = document.querySelectorAll('.popup__button-close');
const nameInput = document.querySelector(".popup__input_profile-name");
const jobInput = document.querySelector(".popup__input_profile-decoration");
const formAdd = document.querySelector(".popup__form_type_create");
const zoomPopup = document.querySelector('.popup_zoom');
const buttonAddCard = document.querySelector('.profile__add-button');
const createCardPopup = document.querySelector('.popup_create');
const createName = document.querySelector('.popup__input_create_name');
const createLink = document.querySelector('.popup__input_create_link');
const container = document.querySelector('.elements__cards');
const popupImg = document.querySelector('.popup__image');
const popupName = document.querySelector('.popup__img-title');


const initialCards = [
    {
        name: 'Земля',
        link: 'https://images.unsplash.com/photo-1590336751349-f65720fee481?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60'
    },
    {
        name: 'Водопад Виктория',
        link: 'https://images.unsplash.com/photo-1603201236596-eb1a63eb0ede?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
    },
    {
        name: 'Пизанская башня',
        link: 'https://images.unsplash.com/photo-1590226053097-e2984346ceaa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
    },
    {
        name: 'Grand Canyon',
        link: 'https://images.unsplash.com/photo-1547036346-addd3025caa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
    },
    {
        name: 'Золотой мост',
        link: 'https://images.unsplash.com/photo-1584911383619-3b0dc33840ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_state_invalid'
};

import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";

const profileFormValidate = new FormValidator(validationConfig, formElement);
profileFormValidate.enableValidation();
const newCardFormValidate = new FormValidator(validationConfig, formAdd);
newCardFormValidate.enableValidation();


function openPopup(elem) {
    elem.classList.add('popup_opened');
    document.addEventListener('keydown', keyEsc);
    elem.addEventListener('mousedown', popupMousedown);
}

function closePopup(elem) {
    elem.classList.remove('popup_opened');
    document.removeEventListener('keydown', keyEsc);
    elem.removeEventListener('mousedown', popupMousedown);
}

function showImage(title, link) {
    popupImg.src = link; 
    popupName.textContent = title;
    openPopup(zoomPopup);
}

function openEditProfile() {
    nameInput.value = name.textContent;
    jobInput.value = decoration.textContent;
    openPopup(popupEditProfile);
}

function popupMousedown(evt) {
    if(evt.target.classList.contains('popup')) {
        const clickOnPopup = evt.target.closest('.popup');
        closePopup(clickOnPopup);
        cleanInputErrors(clickOnPopup);
    }
}

function keyEsc(evt) {
    if(evt.key === 'Escape') {
        closeActivePopup();
    }
}

function closeActivePopup(evt) {
    const activePopup = document.querySelector('.popup_opened');
    if(activePopup) {
        closePopup(activePopup);
        cleanInputErrors(activePopup);
    }
}

function cleanInputErrors(elem) {
    profileFormValidate.enableValidation();
    newCardFormValidate.enableValidation();
}

function formSubmitHandler(evt) {
    evt.preventDefault(); 

    name.textContent = nameInput.value;
    decoration.textContent = jobInput.value;
    closePopup(popupEditProfile);
}

function createCard(title, link) {
    const newCard = new Card(link, title, '.card-temp', showImage).generateCard();
    return newCard;    
}

function addNewCard(newCard) {
    container.prepend(newCard);
}

function formCreate(evt) {
    evt.preventDefault();

    addNewCard(createCard(createName.value, createLink.value));
    closePopup(createCardPopup);
    createName.value = '';
    createLink.value = '';
}


initialCards.forEach(elem => addNewCard(createCard(elem.name, elem.link)));

buttonCloseList.forEach(element => {
    element.addEventListener("click", (evt) => {
        const popup = evt.target.closest(".popup");
        closePopup(popup);
        cleanInputErrors(popup);
    });
});

buttonEditProfile.addEventListener("click", () => {
    openEditProfile();
    profileFormValidate.enableValidation();
});
formElement.addEventListener('submit', formSubmitHandler);
buttonAddCard.addEventListener("click", () => {
    createName.value = '';
    createLink.value = '';
    openPopup(createCardPopup);
    newCardFormValidate.enableValidation();
});
formAdd.addEventListener('submit', formCreate);


