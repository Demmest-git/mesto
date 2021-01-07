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

const userInfo = new UserInfo(".profile__name", ".profile__decoration");

const defaultCardList = new Section({
    items: initialCards,
    renderer: (item) => {
      const link = item.link;
      const title = item.name;
      const cardElement = new Card(link, title, cardTemplateSelector, {
        handleCardClick: (link, title) => {
          const popupWithImage = new PopupWithImage('.popup_zoom', link, title, '.popup__image', '.popup__img-title');
          popupWithImage.open();  
        }
      });
      const cardGenerated = cardElement.generateCard();
      defaultCardList._container.prepend(cardGenerated);
      }
  }, ".elements__cards");
  
  defaultCardList.renderItems();

buttonEditProfile.addEventListener('click', function(){
    const popupProfile = new PopupWithForm('.popup_profile', {
      handleFormSubmit: (evt) => {
        evt.preventDefault();
        const values = popupProfile._getInputValues();
        userInfo.setUserInfo(values[0], values[1]);
        popupProfile.close();
      }
    });
    popupProfile._setInputValues(userInfo.getUserInfo());
    popupProfile.open();
    profileFormValidate.clearErrors();
});


buttonAddCard.addEventListener('click', function(){
    const popupNewCard = new PopupWithForm('.popup_create', {
      handleFormSubmit: (evt) => {
        evt.preventDefault();
        const values = popupNewCard._getInputValues();
        const data = {
          name: values[0],
          link: values[1]
        };
        defaultCardList.addItem(data);
        popupNewCard.close();
      }
    });
    popupNewCard.open();
    newCardFormValidate.clearErrors();
  });
