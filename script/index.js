const popupProfile = document.querySelector('.popup_type_profile');
const popupNewPlace = document.querySelector('.popup_type_add-place');
const popupOpenedImage = document.querySelector('.popup_type_image');
const buttonNewPlace = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__close-button');
const buttonCloseNewCard = popupNewPlace.querySelector('.popup__close-button_pop_add');
const buttonCloseOpenedImage = popupOpenedImage.querySelector('.popup__close-button'); 
const textTitle = document.querySelector('.profile__name');
const textAbout = document.querySelector('.profile__about');
const cardNameInput = popupNewPlace.querySelector('.popup__input_type_place-name');
const cardImgInput = popupNewPlace.querySelector('.popup__input_type_place-link');
const formElement = popupProfile.querySelector('.popup__container-form');
const formNewPlace = popupNewPlace.querySelector('.popup__container-form_type_add');
const inputName = popupProfile.querySelector('.popup__input_type_name');
const inputAbout = popupProfile.querySelector('.popup__input_type_about');
const cardTemplate = document.querySelector('#card').content;
const cardsContainer = document.querySelector('.elements-list');

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
  
  popupOpenedImage.querySelector('.popup__image').src = imageLink;
  popupOpenedImage.querySelector('.popup__image').alt = imageTitle;
  popupOpenedImage.querySelector('.popup__description').textContent = imageTitle;
  openPopup(popupOpenedImage);
}

// Создание карточки
function createCard(elem) {
  const newCardElement = cardTemplate.querySelector('.element').cloneNode(true);
  newCardElement.querySelector('.element__image').src = elem.link;
  newCardElement.querySelector('.element__image').alt = elem.name;
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

// Закрытие при нажатии на крестик
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Заполнение данными полей инпут в попапе профайл
function renderPopupProfile() {
  inputName.value = textTitle.textContent;
  inputAbout.value = textAbout.textContent;
  openPopup(popupProfile);
}

// Создание новой карточки
function addCardHandler(evt) {
  evt.preventDefault();
  
  const newPlace = {name: cardNameInput.value, link: cardImgInput.value};
  addNewCard(newPlace);
  closePopup(popupNewPlace);
  formNewPlace.reset();
}

// Сохранение измененых данных
function formSubmitHandler (evt) {
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
buttonClosePopupProfile.addEventListener('click', function () {
  closePopup(popupProfile);
});
buttonNewPlace.addEventListener('click', function () {
  openPopup(popupNewPlace);
});
buttonCloseNewCard.addEventListener('click', function () {
  closePopup(popupNewPlace);
});

buttonCloseOpenedImage.addEventListener('click', function () {
  closePopup(popupOpenedImage);
});

formElement.addEventListener('submit', formSubmitHandler); 
formNewPlace.addEventListener('submit', addCardHandler);
