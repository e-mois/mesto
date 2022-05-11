import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const popupList = Array.from(document.querySelectorAll('.popup'));
const popupProfile = document.querySelector('.popup_type_profile');
const popupNewPlace = document.querySelector('.popup_type_add-place');
const popupOpenedImage = document.querySelector('.popup_type_image');
const buttonNewPlace = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit');
const textTitle = document.querySelector('.profile__name');
const textAbout = document.querySelector('.profile__about');
const cardNameInput = popupNewPlace.querySelector('.popup__input_type_place-name');
const cardImgInput = popupNewPlace.querySelector('.popup__input_type_place-link');
const formProfile = popupProfile.querySelector('.popup__container-form_type_profile');
const formNewPlace = popupNewPlace.querySelector('.popup__container-form_type_add');
const inputName = popupProfile.querySelector('.popup__input_type_name');
const inputAbout = popupProfile.querySelector('.popup__input_type_about');
const cardTemplate = document.querySelector('#card');
const imageOpened = popupOpenedImage.querySelector('.popup__image');
const imageDescription = popupOpenedImage.querySelector('.popup__description');
const cardsContainer = document.querySelector('.elements-list');

const objSelectors = {
  formElement: '.popup__container-form',
  inputElement: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

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


// Открытие попапа с картинкой
const handleCardClick = (elem) => {
  imageOpened.src = elem.link;
  imageOpened.alt = elem.name;
  imageDescription.textContent = elem.name;
  openPopup(popupOpenedImage);
}

function makeNewCard(elem, template) {
  const newCard = new Card(elem, template, handleCardClick);
  const card = newCard.createCard();
  return card;
}

// Обработка массива с созданием карточек
initialCards.forEach((elem) => {
  const newCard = makeNewCard(elem, cardTemplate);
  cardsContainer.prepend(newCard);
})

// Обработчик нажатия ESC

const pressEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpenedNow = document.querySelector('.popup_opened');
    closePopup(popupOpenedNow);
  }
}

// Проверка наличия формы в попапе
const checkedForm = (popup) => {
  return popup.querySelector('.popup__container-form');
}


// Очистка инпутов при закрытии попапа с формой
const clearInput = (popup) => {
  const form = checkedForm(popup);
  if (form) {
    form.reset();
  }
}

// Закрытие при нажатии на крестик
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', pressEsc);
  clearInput(popup);
}

// Открытие попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', pressEsc);
}

// Заполнение данными полей инпут в попапе профайл
function renderPopupProfile() {
  inputName.value = textTitle.textContent;
  inputAbout.value = textAbout.textContent;
  openPopup(popupProfile);
}

// Создание новой карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  
  const newPlace = {name: cardNameInput.value, link: cardImgInput.value};
  const newCard = makeNewCard(newPlace, cardTemplate);
  cardsContainer.prepend(newCard);
  closePopup(popupNewPlace);
}

// Сохранение измененых данных
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
  textTitle.textContent = inputName.value;
  textAbout.textContent = inputAbout.value;
  closePopup(popupProfile);
}

// Обработчики
buttonEditProfile.addEventListener('click', function () {
  renderPopupProfile();
  formValidators['EditProfile'].resetValidation();
});

buttonNewPlace.addEventListener('click', function () {
  openPopup(popupNewPlace);
  formValidators['NewPlace'].resetValidation();
});

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
  })
})

formProfile.addEventListener('submit', handleProfileFormSubmit); 
formNewPlace.addEventListener('submit', handleCardFormSubmit);
