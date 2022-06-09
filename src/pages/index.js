import './index.css'

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js"
import { objSelectors } from '../utils/utils.js';
import { PopupDelete } from '../components/PopupDelete.js';

const buttonNewPlace = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit');
const buttonChangeAvatar = document.querySelector('.profile__avatar-link')

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '9a46e9be-990d-4687-a3f3-228b3fb0133e',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUser(), api.getCards()])
// тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
  .then(([userData, cardsList]) => {
      // тут установка данных пользователя
        userInfo.setUserInfo({
          name: userData.name,
          about: userData.about,
        });
        userInfo.setAvatar(userData);
        userInfo.setID(userData);
      // и тут отрисовка карточек
        cards.renderedItems = cardsList;
        cards.renderItems();
  })
  .catch(err => {
    console.log(err)// тут ловим ошибку
  });

const popupChangeAvatar = new PopupWithForm({
  callbackFunction: (data) => {
    popupChangeAvatar.renderLoading(true, "Сохранение...");
    api.changeAvatar(data)
    .then((res) => {
      userInfo.setAvatar(res);
      popupChangeAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupChangeAvatar.renderLoading(false, '');
    });
  }
  }, '.popup_type_avatar');
popupChangeAvatar.setEventListeners();

const cards = new Section({
  data: [],
  renderer: (item) => {
    const newCard = new Card(item, '#card', { handleCardClick, handleCardClickDelete, handleLike }, userInfo.userID);
    const card = newCard.createCard();
    return card;
  }
}, '.elements-list');

const appendNewCard = (popup, data) => {
  popup.renderLoading(true, "Сохранение...");
  api.addNewCard(data)
  .then((data) => {
    cards.addItem(data);
    popup.close();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })
  .finally(() => {
    popup.renderLoading(false, '');
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

const getCardInfo = (popup, card) => {
  popup.cardID = card.getID();
  popup.targetElement = card.buttonDelete.closest('.element');
}

const handleCardClickDelete = (card) => {
  getCardInfo(popupAproveDelete, card);
  popupAproveDelete.open();
}

const popupAproveDelete = new PopupDelete({
  callbackFunction: (popup) => {
    popup.renderLoading(true, "Удаление...")
    api.deleteCard(popup.cardID)
    .then(() => {
      popup.targetElement.remove();
      popup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popup.renderLoading(false, '')
    })
  }
}, '.popup_type_delete');
popupAproveDelete.setEventListeners();

const handleLike = (card) => {
  if (!card.isLiked()) {
    api.activateLike(card.getID())
    .then((res) => {
      card.updateLike(res);
    })
    .catch((err) => {
      console.log(err);
    })
  } else {
    api.disactivateLike(card.getID())
    .then((res) => {
      card.updateLike(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

const userInfo = new UserInfo({
  selectorName: '.profile__name',
  selectorAbout: '.profile__about',
  selectorAvatar: '.profile__avatar'
})

const popupNewPlace = new PopupWithForm({
  callbackFunction: (data) => {
    appendNewCard(popupNewPlace, data);
  }
  }, '.popup_type_add-place');
popupNewPlace.setEventListeners();

const editProfilePopup = new PopupWithForm({
  callbackFunction: (data) => {
    editProfilePopup.renderLoading(true, 'Сохранение...')
    api.editProfile(data)
    .then((res) => {
      userInfo.setUserInfo({name: res.name, about: res.about});
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfilePopup.renderLoading(false, '');
    });
  }
}, '.popup_type_profile'
);
editProfilePopup.setEventListeners();

// Обработчики
buttonEditProfile.addEventListener('click', () => {
  const startInputValue = userInfo.getUserInfo();
  editProfilePopup.setInputValues(startInputValue);
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
