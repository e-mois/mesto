import './index.css'

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js"
import { objSelectors } from '../utils/utils.js';
import { avatar } from '../utils/constants.js';
import { PopupDelete } from '../components/PopupDelete.js';

const popupProfile = document.querySelector('.popup_type_profile');
const buttonNewPlace = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit');
const inputName = popupProfile.querySelector('.popup__input_type_name');
const inputAbout = popupProfile.querySelector('.popup__input_type_about');
const buttonChangeAvatar = document.querySelector('.profile__avatar-link')
let userID;


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '9a46e9be-990d-4687-a3f3-228b3fb0133e',
    'Content-Type': 'application/json'
  }
});

const popupChangeAvatar = new PopupWithForm({
  callbackFunction: (data) => {
    console.log(data);
    api.changeAvatar(data)
    .then((res) => {
      avatar.src = res.avatar;
      popupChangeAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    });
  }
  }, '.popup_type_avatar');
popupChangeAvatar.setEventListeners();

const cards = new Section({
  data: [],
  renderer: (item) => {
    const card = makeNewCard(item);
    cards.addItem(card);
  }
}, '.elements-list');



api.getUser()
.then(data => {
  userInfo.setUserInfo({
    name: data.name,
    about: data.about
  });
  avatar.src = data.avatar;
  userID = data._id;
});

api.getCards()
.then(data => {
  cards.renderedItems = data;
  cards.renderItems();
})

const appendNewCard = (popup, data) => {
  popup.loadingSave(true, "Сохранение...")
  api.addNewCard(data)
  .then((data) => {
    cards.renderer(data);
    popup.close();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })
  .finally(() => {
    popup.loadingSave(false, '');
  })
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

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

//Открытие попапа с картинкой
const handleCardClick = (item) => {
  popupWithImage.open(item);
}

const popupAproveDelete = new PopupDelete({
  callbackFunction: (cardID, target) => {
    popupAproveDelete.loadingSave(true, "Удаление...")
    api.deleteCard(cardID, target)
    .then(() => {
      target.remove();
      popupAproveDelete.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAproveDelete.loadingSave(false, '')
    })
  }
}, '.popup_type_delete');
popupAproveDelete.setEventListeners();

const getCardInfo = (popup, cardID, target) => {
  popup.cardID = cardID;
  popup.targetElement = target;
}

const handleCardClickDelete = (cardID, target) => {
  getCardInfo(popupAproveDelete, cardID, target);
  popupAproveDelete.open();
}

const activateLike = (cardID) => {
  return api.activateLike(cardID);
}

const disactivateLike = (cardID) => {
  return api.disactivateLike(cardID);
}

function makeNewCard(item) {
  const newCard = new Card(item, '#card', { handleCardClick, handleCardClickDelete, activateLike, disactivateLike }, userID);
  const card = newCard.createCard();
  return card;
}

const userInfo = new UserInfo({
  selectorName: '.profile__name',
  selectorAbout: '.profile__about'
})

const popupNewPlace = new PopupWithForm({
  callbackFunction: (data) => {
    appendNewCard(popupNewPlace, data);
  }
  }, '.popup_type_add-place');
popupNewPlace.setEventListeners();

const editProfilePopup = new PopupWithForm({
  callbackFunction: (data) => {
    editProfilePopup.loadingSave(true, 'Сохранение...')
    api.editProfile(data)
    .then((res) => {
      userInfo.setUserInfo({name: res.name, about: res.about});
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfilePopup.loadingSave(false, '');
    });
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

buttonChangeAvatar.addEventListener('click', function () {
  popupChangeAvatar.open();
  formValidators['ChangeAvatar'].resetValidation();
})
