import '../pages/index.css'

import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { initialCards } from "./data.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

const popupProfile = document.querySelector('.popup_type_profile');
const buttonNewPlace = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit');
const inputName = popupProfile.querySelector('.popup__input_type_name');
const inputAbout = popupProfile.querySelector('.popup__input_type_about');
const cardTemplate = document.querySelector('#card');

const objSelectors = {
  formElement: '.popup__container-form',
  inputElement: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formElement))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(objSelectors);

//Открытие попапа с картинкой
const handleCardClick = (item) => {
  const popupWithImage = new PopupWithImage(item, '.popup_type_image');
  popupWithImage.open();
}

function makeNewCard(item) {
  const newCard = new Card(cardTemplate, handleCardClick);
  const card = newCard.createCard(item);
  return card;
}

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = makeNewCard(item);
    cardList.addItem(card);
  }
}, '.elements-list');

cardList.renderItems();

const userInfo = new UserInfo({
  selectorName: '.profile__name',
  selectorAbout: '.profile__about'
})

const popupNewPlace = new PopupWithForm({
  callbackFunction: (data) => {
    const newCard = new Section({
      data: data,
      renderer: (item) => {
        const card = makeNewCard(item);
        newCard.addItem(card);
      }
    }, '.elements-list')
    newCard.renderOneCard();
    popupNewPlace.close();
  }
  }, '.popup_type_add-place');
popupNewPlace.setEventListeners();

const editProfilePopup = new PopupWithForm({
  callbackFunction: () => {
    userInfo.setUserInfo();
    editProfilePopup.close();
  }
}, '.popup_type_profile'
);
editProfilePopup.setEventListeners();

// Обработчики
buttonEditProfile.addEventListener('click', () => {
  const startInputValue = userInfo.getUserInfo();
  inputName.value = startInputValue.name;
  inputAbout.value = startInputValue.about;
  editProfilePopup.open();
  formValidators['EditProfile'].resetValidation();
});

buttonNewPlace.addEventListener('click', function () {
  popupNewPlace.open();
  formValidators['NewPlace'].resetValidation();
});
