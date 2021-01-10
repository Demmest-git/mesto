import './index.css';

import {
    name,
    decoration,
    formElement,
    buttonEditProfile,
    popupEditProfile,
    buttonCloseList,
    nameInput,
    jobInput,
    formAdd,
    zoomPopup,
    buttonAddCard,
    createCardPopup,
    createName,
    createLink,
    container,
    popupImg,
    popupName,
    initialCards,
    validationConfig,
    cardTemplateSelector
} from '../utils/constants';

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

const profileFormValidate = new FormValidator(validationConfig, formElement);
profileFormValidate.enableValidation();
const newCardFormValidate = new FormValidator(validationConfig, formAdd);
newCardFormValidate.enableValidation();

const popupWithImage = new PopupWithImage('.popup_zoom', '.popup__image', '.popup__img-title');

function createCard(link, title, cardTemplateSelector){
  return new Card(link, title, cardTemplateSelector, {
    handleCardClick: (link, title) => {
      popupWithImage.open(link, title);  
    }
  })
}

const defaultCardList = new Section({
    items: initialCards,
    renderer: (item) => {
      const link = item.link;
      const title = item.name;
      const cardElement = createCard(link, title, cardTemplateSelector);
      const cardGenerated = cardElement.generateCard();
      defaultCardList.addItem(cardGenerated, true);
      }
  }, ".elements__cards");
  
  defaultCardList.renderItems();

buttonEditProfile.addEventListener('click', function(){
    const popupProfile = new PopupWithForm('.popup_profile', {
      handleFormSubmit: (values) => {
        userInfo.setUserInfo(values.name, values.decoration);
      }
    });
    const userName = userInfo.getUserInfo();
    nameInput.value = userName.profileName;
    jobInput.value = userName.profileJob;
    popupProfile.open();
    profileFormValidate.clearErrors();
});

const userInfo = new UserInfo(".profile__name", ".profile__decoration");

buttonAddCard.addEventListener('click', function(){
    const popupNewCard = new PopupWithForm('.popup_create', {
      handleFormSubmit: (values) => {
        const data = {
          name: values.addName,
          link: values.link
        };
        const newCardElement = createCard(data.link, data.name, cardTemplateSelector).generateCard();
        defaultCardList.addItem(newCardElement, false);
      }
    });
    popupNewCard.open();
    newCardFormValidate.clearErrors();
  });
