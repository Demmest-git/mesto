const name = document.querySelector(".profile__name");
const decoration = document.querySelector(".profile__decoration");
const formElement = document.querySelector(".popup__form_type_profile");
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_profile');
const buttonClose = document.querySelectorAll('.popup__button-close');
const nameInput = document.querySelector(".popup__input_profile-name");
const jobInput = document.querySelector(".popup__input_profile-decoration");
const formAdd = document.querySelector(".popup__form_type_create");
const templateCard = document.querySelector('.card-temp').content;
const zoomPopup = document.querySelector('.popup_zoom');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonCreateCard = document.querySelector('.popup__button-create');
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

function openPopup(elem) {
    elem.classList.add('popup_opened');
}

function closePopup(elem) {
    elem.classList.remove('popup_opened');
}

function deleteCard(evt) {
    evt.target.closest('.card').remove();
}

function like(evt) {
    evt.target.classList.toggle('card__like_active');
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


function closeEditProfile() {
    closePopup(popupEditProfile);
}

function formSubmitHandler(evt) {
    evt.preventDefault(); 

    name.textContent = nameInput.value;
    decoration.textContent = jobInput.value;
    closePopup(popupEditProfile);
}

function createCard(title, link) {
    const newCard = templateCard.cloneNode(true);
    const cardImage = newCard.querySelector('.card__image');

    cardImage.src = link;
    cardImage.alt = title;
    newCard.querySelector('.card__name').textContent = title;
    newCard.querySelector('.card__trash').addEventListener("click", deleteCard);
    cardImage.addEventListener("click", () => showImage(title, link));
    newCard.querySelector('.card__like').addEventListener("click", like)
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

buttonClose.forEach(element => {
    element.addEventListener("click", (evt) => {
        closePopup(evt.target.closest(".popup"));
    })
});

buttonEditProfile.addEventListener("click", openEditProfile);
formElement.addEventListener('submit', formSubmitHandler);
buttonAddCard.addEventListener("click", (evt) => openPopup(createCardPopup));
formAdd.addEventListener('submit', formCreate);


