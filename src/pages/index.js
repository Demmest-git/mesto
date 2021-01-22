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
    formConfirmDelete,
    userId
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

const userInfo = new UserInfo('.profile__name', '.profile__decoration', avatarImageSelector);

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then((data) => {
    const user = data[0];
    const cards = data[1];

    userInfo.setUserInfo(user.name, user.about);
    userInfo.setUserAvatar(user.avatar);

    defaultCardList.renderItems(cards);
})
.catch((err) => console.log(err));

const popupNewCard = new PopupWithForm('.popup_create', {
  handleFormSubmit: (values) => {
    popupNewCard.setBtnText('Создание...');
    api.addNewCard(values)
    .then((res) => {
      const newCardElement = createCard(res);
      defaultCardList.addItem(newCardElement, false);
    })
    .catch(err => console.log(err))
    .finally(() => popupNewCard.setDefaultBtnText());
  }
});

const popupProfile = new PopupWithForm('.popup_profile', {
  handleFormSubmit: (values) => {
    popupProfile.setBtnText('Сохранение...');
    api.setUserInfo(values)
        .then((res) => {
          userInfo.setUserInfo(res.name, res.about)
        })
        .catch(err => console.log(err))
        .finally(() => {
          popupProfile.setDefaultBtnText();
        })
  }
});

const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, {
  handleFormSubmit: (values) => {
    popupEditAvatar.setBtnText('Сохранение...');
    api.setUserAvatar(values)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      popupEditAvatar.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupEditAvatar.setDefaultBtnText());
  }
});

const popupDeleteCard = new PopupWithForm(popupCardDeleteSelector, {
  handleFormSubmit: (values) => {
    popupDeleteCard.setBtnText('Удаление...');
    api.deleteCard(popupDeleteCard.cardObject)
    .then((res) => {
      popupDeleteCard.cardObject.deleteCard();
      popupDeleteCard.cardObject = "";
    })
    .catch(err => console.log(err))
    .finally(() => popupDeleteCard.setDefaultBtnText());
  }
});

function createCard(elem){
  const card = new Card({
    likes: elem.likes,
    cardId: elem._id,
    name: elem.name,
    link: elem.link,
    owner: elem.owner
  },
  {
    handleCardClick: (link, title) => {
      popupWithImage.open(link, title);  
    },
    handleLikeClick: () => {
      let likeApi = {};
      if (card.isLikedMe()){
        likeApi = api.deleteLike(card.getIdCard());
      }else {
        likeApi = api.likeCard(card.getIdCard());
      }
      likeApi.then(res => {
          card.setCountLikes(res.likes);
          card.renderLikes();
          card.handleLikeButton();
      })
      .catch(err => console.log(err))
    },
    handleTrashClick: (cardObject) => {
      popupDeleteCard.open();
      popupDeleteCard.cardObject = cardObject;
    }
  }, cardTemplateSelector, userId);
  return card.generateCard();
}

const defaultCardList = new Section({
    renderer: (item) => {
      const cardElement = createCard(item);
      defaultCardList.addItem(cardElement, true);
      }
  }, ".elements__cards");
  

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


buttonAddCard.addEventListener('click', function(){
    popupNewCard.open();
    newCardFormValidate.clearErrors();
  });

popupProfile.setEventListeners();
popupNewCard.setEventListeners();
popupEditAvatar.setEventListeners();
popupDeleteCard.setEventListeners();

