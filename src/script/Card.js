class Card {
  constructor(cardTemplate, handleCardClick) {
    this._cardTemplate = cardTemplate;
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
  _setEventListeners(data) {
    this._buttonLike.addEventListener('click', this._activeLike);
    this._buttonDelete.addEventListener('click', this._deleteCard);
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(data);
    })
  }

    // Создание карточки
  createCard(data) {
    this._cardTitle.textContent = data.name; 
    this._cardImage.src = data.link; 
    this._cardImage.alt = data.name;
    this._setEventListeners(data);
    return this.cardElement;
  }

}

export { Card }