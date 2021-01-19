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
    cardTemplateSelector,
    formEditAvatar,
    buttonEditAvatar,
    popupEditAvatarSelector,
    popupCardDeleteSelector,
    avatarImageSelector,
    buttonConfirmDelete,
    formConfirmDelete
} from '../utils/constants';

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const profileFormValidate = new FormValidator(validationConfig, formElement);
profileFormValidate.enableValidation();

const newCardFormValidate = new FormValidator(validationConfig, formAdd);
newCardFormValidate.enableValidation();

const avatarFormValidate = new FormValidator(validationConfig, formEditAvatar);
avatarFormValidate.enableValidation();

const deleteFormValidate = new FormValidator(validationConfig, formConfirmDelete);
deleteFormValidate.enableValidation();

const api = new Api({address: 'https://mesto.nomoreparties.co/v1/', token: '7b08d339-716f-4c25-b8bf-2cb242815db3', groupId: 'cohort-19'});

const popupWithImage = new PopupWithImage('.popup_zoom', '.popup__image', '.popup__img-title');

const popupNewCard = new PopupWithForm('.popup_create', {
  handleFormSubmit: (values) => {
    const data = {
      name: values.addName,
      link: values.link
    };
    const newCardElement = createCard(data.link, data.name, buttonConfirmDelete, cardTemplateSelector).generateCard();
    defaultCardList.addItem(newCardElement, false);
  }
});

const popupProfile = new PopupWithForm('.popup_profile', {
  handleFormSubmit: (values) => {
    userInfo.setUserInfo(values.name, values.decoration);
  }
});

const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, {
  handleFormSubmit: (values) => {
    userInfo.setUserAvatar(values.avatar);
  }
});

const popupDeleteAvatar = new PopupWithForm(popupCardDeleteSelector, {
  handleFormSubmit: (values) => {
  }
});

function createCard(link, title, buttonDelete, cardTemplateSelector){
  return new Card(link, title, buttonDelete, cardTemplateSelector, {
    handleCardClick: (link, title) => {
      popupWithImage.open(link, title);  
    },
    handleTrashClick: () => {
      popupDeleteAvatar.open();  
    }
  })
}

const defaultCardList = new Section({
    // items: initialCards,
    renderer: (item) => {
      const link = item.link;
      const title = item.name;
      const cardElement = createCard(link, title, buttonConfirmDelete, cardTemplateSelector);
      const cardGenerated = cardElement.generateCard();
      defaultCardList.addItem(cardGenerated, true);
      }
  }, ".elements__cards");
  
  // defaultCardList.renderItems();

buttonEditProfile.addEventListener('click', function(){
    const userName = userInfo.getUserInfo();
    nameInput.value = userName.profileName;
    jobInput.value = userName.profileJob;
    popupProfile.open();
    profileFormValidate.clearErrors();
});
buttonEditAvatar.addEventListener('click', function(){
    popupEditAvatar.open();
    avatarFormValidate.clearErrors();
});

const userInfo = new UserInfo('.profile__name', '.profile__decoration', avatarImageSelector);

buttonAddCard.addEventListener('click', function(){
    popupNewCard.open();
    newCardFormValidate.clearErrors();
  });

popupProfile.setEventListeners();
popupNewCard.setEventListeners();
popupEditAvatar.setEventListeners();
popupDeleteAvatar.setEventListeners();

console.log(api.getInitialCards());

api.getInitialCards()
    .then(result => {
        console.log(result);
        defaultCardList.renderItems(result)
    })
    .catch(err => console.log('Ошибка при получении сообщений'));