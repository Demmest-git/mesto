export const name = document.querySelector(".profile__name");
export const decoration = document.querySelector(".profile__decoration");
export const formElement = document.querySelector(".popup__form_type_profile");
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const popupEditProfile = document.querySelector('.popup_profile');
export const buttonCloseList = document.querySelectorAll('.popup__button-close');
export const nameInput = document.querySelector(".popup__input_profile-name");
export const jobInput = document.querySelector(".popup__input_profile-decoration");
export const formAdd = document.querySelector(".popup__form_type_create");
export const zoomPopup = document.querySelector('.popup_zoom');
export const buttonAddCard = document.querySelector('.profile__add-button');
export const createCardPopup = document.querySelector('.popup_create');
export const createName = document.querySelector('.popup__input_create_name');
export const createLink = document.querySelector('.popup__input_create_link');
export const container = document.querySelector('.elements__cards');
export const popupImg = document.querySelector('.popup__image');
export const popupName = document.querySelector('.popup__img-title');
export const cardTemplateSelector = '.card-temp';
export const formEditAvatar = document.querySelector('.popup__form_type_avatar');
export const formConfirmDelete = document.querySelector('.popup__form_type_delete');
export const buttonEditAvatar = document.querySelector('.profile__avatar-edit');
export const popupEditAvatarSelector = '.popup_edit-avatar';
export const popupCardDeleteSelector = '.popup_delete';
export const avatarImageSelector = '.profile__avatar-img';
export const buttonConfirmDelete = document.querySelector('.popup__button-delete');



export const initialCards = [
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

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_state_invalid'
};