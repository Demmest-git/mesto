let name = document.querySelector(".profile__name");
let decoration = document.querySelector(".profile__decoration");
let formElement = document.querySelector(".popup__form");
let buttonEditProfile = document.querySelector('.profile__edit-button');
let popupEditProfile = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__button-close');
let nameInput = document.querySelector(".popup__input_profile-name");
let jobInput = document.querySelector(".popup__input_profile-decoration");


function openEditProfile() {
    popupEditProfile.classList.add("popup_opened");
    nameInput.value = name.textContent;
    jobInput.value = decoration.textContent;
}


function closeEditProfile() {
    popupEditProfile.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
    evt.preventDefault(); 

    name.textContent = nameInput.value;
    decoration.textContent = jobInput.value;
    popupEditProfile.classList.remove("popup_opened");
}


buttonEditProfile.addEventListener("click", openEditProfile);
buttonClose.addEventListener("click", closeEditProfile);
formElement.addEventListener('submit', formSubmitHandler);


