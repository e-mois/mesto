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
const cardTemplate = document.querySelector('#card').content;
const cardsContainer = document.querySelector('.elements-list');
const imageOpened = popupOpenedImage.querySelector('.popup__image');
const imageDescription = popupOpenedImage.querySelector('.popup__description');

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

// Лайк
function activeLike(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('element__like_type_active');
}

// Удаление карточки
function deleteCard(evt) {
  const eventTarget = evt.target;
  const cardDeleted = eventTarget.closest('.element');
  cardDeleted.remove();
}

// Открытие попапа с картинкой
function renderImagePopup(elem) {
  const imageLink = elem.link;
  const imageTitle = elem.name;
  
  imageOpened.src = imageLink;
  imageOpened.alt = imageTitle;
  imageDescription.textContent = imageTitle;
  openPopup(popupOpenedImage);
}

// Создание карточки
function createCard(elem) {
  const newCardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const newCardImage = newCardElement.querySelector('.element__image');
  newCardImage.src = elem.link;
  newCardImage.alt = elem.name;
  newCardElement.querySelector('.element__title').textContent = elem.name;
  newCardElement.querySelector('.element__like').addEventListener('click', activeLike);
  newCardElement.querySelector('.element__trashbin').addEventListener('click', deleteCard);
  newCardElement.querySelector('.element__link').addEventListener('click', () => renderImagePopup(elem));
  return newCardElement;
}

// Добавление новой карточки на страницу
function addNewCard(elem) {
  const newCard = createCard(elem);
  cardsContainer.prepend(newCard);
}

// Обработка массива с созданием карточек
initialCards.forEach((elem) => {
  addNewCard(elem);
})

// Обработчик нажатия ESC

const pressEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpenedNow = document.querySelector('.popup_opened');
    closePopup(popupOpenedNow);
  }
}

// Закрытие при нажатии на крестик
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', pressEsc);
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
  addNewCard(newPlace);
  closePopup(popupNewPlace);
  formNewPlace.reset();
  const buttonSaveNewPlace = formNewPlace.querySelector('.popup__button_type_create');
  buttonSaveNewPlace.disabled = true;
  buttonSaveNewPlace.classList.add('popup__button_disabled');
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
});

buttonNewPlace.addEventListener('click', function () {
  openPopup(popupNewPlace);
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

//popupList.forEach((popup) => {
//  popup.addEventListener('click', (evt) => {
//    if (evt.target === evt.currentTarget) {
//      closePopup(popup);
//    }
//  })
//})

formProfile.addEventListener('submit', handleProfileFormSubmit); 
formNewPlace.addEventListener('submit', handleCardFormSubmit);
