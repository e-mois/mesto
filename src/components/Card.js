class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._data = data;
    this._cardTemplate = document.querySelector(cardSelector);
    this._handleCardClick = handleCardClick;
    this.cardElement = this._cardTemplate.content.querySelector('.element').cloneNode(true);
    this._buttonLike = this.cardElement.querySelector('.element__like');
    this._buttonDelete = this.cardElement.querySelector('.element__trashbin');
    this._cardTitle = this.cardElement.querySelector('.element__title');
    this._cardImage = this.cardElement.querySelector('.element__image');
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

  // Добавление обработчиков для карточки
  _setEventListeners() {
    this._buttonLike.addEventListener('click', this._activeLike);
    this._buttonDelete.addEventListener('click', this._deleteCard);
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    })
  }

    // Создание карточки
  createCard() {
    this._cardTitle.textContent = this._data.name; 
    this._cardImage.src = this._data.link; 
    this._cardImage.alt = this._data.name;
    this._setEventListeners();
    return this.cardElement;
  }

}

export { Card }