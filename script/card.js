import { renderImagePopup } from "./index.js";

const cardsContainer = document.querySelector('.elements-list');

class Card {
  constructor(cardItem, cardSelector) {
    this._cardItem = cardItem;
    this._cardSelector = cardSelector;
  }

    // Лайк
  _activeLike(evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('element__like_type_active');
    }
  
  // Удаление карточки
  _deleteCard(evt) {
    const eventTarget = evt.target;
    const cardDeleted = eventTarget.closest('.element');
    cardDeleted.remove();
  }

    // Создание карточки
  _createCard() {
    const newCardElement = this._cardSelector
            .content
            .querySelector('.element')
            .cloneNode(true);
    const newCardImage = newCardElement.querySelector('.element__image');
    newCardImage.src = this._cardItem.link;
    newCardImage.alt = this._cardItem.name;
    newCardElement.querySelector('.element__title').textContent = this._cardItem.name;
    newCardElement.querySelector('.element__like').addEventListener('click', this._activeLike);
    newCardElement.querySelector('.element__trashbin').addEventListener('click', this._deleteCard);
    newCardElement.querySelector('.element__link').addEventListener('click', () => renderImagePopup(this._cardItem));
    return newCardElement;
  }

  // Добавление новой карточки на страницу
  addNewCard() {
    const newCard = this._createCard();
    cardsContainer.prepend(newCard);
  }

}

export { Card }