import './index.css'

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { initialCards } from "../utils/utils.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import { objSelectors } from '../utils/utils.js';

const popupProfile = document.querySelector('.popup_type_profile');
const buttonNewPlace = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit');
const inputName = popupProfile.querySelector('.popup__input_type_name');
const inputAbout = popupProfile.querySelector('.popup__input_type_about');

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

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

//Открытие попапа с картинкой
const handleCardClick = (item) => {
  popupWithImage.open(item);
}

function makeNewCard(item) {
  const newCard = new Card(item, '#card', handleCardClick);
  const card = newCard.createCard();
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
    cardList._renderer(data);
    popupNewPlace.close();
  }
  }, '.popup_type_add-place');
popupNewPlace.setEventListeners();

const editProfilePopup = new PopupWithForm({
  callbackFunction: (data) => {
    userInfo.setUserInfo(data);
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
