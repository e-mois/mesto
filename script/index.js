let popup = document.querySelector('.popup');
let popupAddPlace = document.querySelector('.popup_type_add-place');
let popupOpenedImage = document.querySelector('.popup-image');
let addPlaceButton = document.querySelector('.profile__add-button');
let editButton = document.querySelector('.profile__edit');
let closeButton = popup.querySelector('.popup__close-button');
let closeButtonAddPlace = popupAddPlace.querySelector('.popup__close-button_pop_add');
let closeButtonOpenedImage = popupOpenedImage.querySelector('.popup-image__close-button'); 
let textTitle = document.querySelector('.profile__name');
let textAbout = document.querySelector('.profile__about');
let formElement = popup.querySelector('.popup__container-form');
let formNewPlace = popupAddPlace.querySelector('.popup__container-form_type_add');
let inputName = popup.querySelector('.popup__input_type_name');
let inputAbout = popup.querySelector('.popup__input_type_about');

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

let cardTemplate = document.querySelector('#card').content;
let cardsContainer = document.querySelector('.elements-list');
let likeButton = document.querySelector('.element__like');

// Лайк
function activeLike(evt) {
  evt.preventDefault();
  const eventTarget = evt.target;
  eventTarget.classList.toggle('element__like_type_active');
}

// Удаление карточки
function deleteCard(evt) {
  evt.preventDefault();
  const eventTarget = evt.target;
  const delCard = eventTarget.closest('.element');
  delCard.remove();
}

// Открытие попапа с картинкой
function openImage(evt) {
  evt.preventDefault();
  const eventTarget = evt.target;
  const imageLink = eventTarget.src;
  const imageTitle = eventTarget.closest('.element').querySelector('.element__title').textContent;
  
  popupOpenedImage.querySelector('.popup-image__image').src = imageLink;
  popupOpenedImage.querySelector('.popup-image__title').textContent = imageTitle;
  popupOpenedImage.classList.add('popup_opened');
}

// Создание карточки
function createCard(elem) {
  const newCardElement = cardTemplate.querySelector('.element').cloneNode(true);
  newCardElement.querySelector('.element__image').src = elem.link;
  newCardElement.querySelector('.element__image').alt = elem.name;
  newCardElement.querySelector('.element__title').textContent = elem.name;
  newCardElement.querySelector('.element__like').addEventListener('click', activeLike);
  newCardElement.querySelector('.element__trashbin').addEventListener('click', deleteCard);
  newCardElement.querySelector('.element__link').addEventListener('click', openImage);
  cardsContainer.prepend(newCardElement);
}

// Обработка массива с созданием карточек
initialCards.forEach((elem) => {
  createCard(elem);
})

// Закрытие при нажатии на крестик
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Открытие попапа для редактирования
function openPopup() {
  inputName.value = textTitle.textContent;
  inputAbout.value = textAbout.textContent;
  popup.classList.add('popup_opened');
}

// Открытие попапа для создания карточки
function openPopupAddPlace() {
  popupAddPlace.classList.add('popup_opened');
  let inputCardName = popupAddPlace.querySelector('.popup__input_type_place-name');
  let inputCardImg = popupAddPlace.querySelector('.popup__input_type_place-link');
  inputCardName.value = 'Название';
  inputCardImg.value = 'Ссылка на картинку';
}

// Создание новой карточки
function addCardHandler(evt) {
  evt.preventDefault();
  
  let inputCardName = popupAddPlace.querySelector('.popup__input_type_place-name').value;
  let inputCardImg = popupAddPlace.querySelector('.popup__input_type_place-link').value;
  let newPlace = {name: inputCardName, link: inputCardImg};
  initialCards.unshift(newPlace);
  closePopup(popupAddPlace);
  createCard(initialCards[0]);
}

// Сохранение измененых данных
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
  textTitle.textContent = inputName.value;
  textAbout.textContent = inputAbout.value;
  closePopup(popup);
}

// Обработчики
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup.bind(this, popup));
closeButtonAddPlace.addEventListener('click', closePopup.bind(this, popupAddPlace));
closeButtonOpenedImage.addEventListener('click', closePopup.bind(this, popupOpenedImage));
addPlaceButton.addEventListener('click', openPopupAddPlace);
formElement.addEventListener('submit', formSubmitHandler); 
formNewPlace.addEventListener('submit', addCardHandler);
