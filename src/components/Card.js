class Card {
  constructor(data, cardSelector, { handleCardClick, handleCardClickDelete, handleLike }, user) {
    this.data = data;
    this._cardTemplate = document.querySelector(cardSelector);
    this._handleCardClick = handleCardClick;
    this._handleCardClickDelete = handleCardClickDelete;
    this._handleLike = handleLike
    this._cardElement = this._cardTemplate.content.querySelector('.element').cloneNode(true);
    this._buttonLike = this._cardElement.querySelector('.element__like');
    this.buttonDelete = this._cardElement.querySelector('.element__trashbin');
    this._cardTitle = this._cardElement.querySelector('.element__title');
    this._cardImage = this._cardElement.querySelector('.element__image');
    this._countLike = this._cardElement.querySelector('.element__like-count');
    this._user = user;
    this._likes = this.data.likes;
    this._listUserLiked = [];
  }

  getID() {
    return this.data._id;
  }

  // Добавление обработчиков для карточки
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLike(this);
    })
    if (this._user === this.data.owner._id) {
      this.buttonDelete.classList.add('element__trashbin_visible');
      this.buttonDelete.addEventListener('click', () => {
        this._handleCardClickDelete(this);
      });
    }
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this.data);
    })
  }

  _generateListUserLiked(likeList) {
    const listUserLiked = [];
    likeList.forEach(element => {
      listUserLiked.push(element._id);
    });
    return listUserLiked;
  }

  isLiked() {
    return this._buttonLike.classList.contains('element__like_type_active');
  }

  updateLike(response) {
    this._buttonLike.classList.toggle('element__like_type_active');
    this._countLike.textContent = response.likes.length;
  }

    // Создание карточки
  createCard() {
    this._cardTitle.textContent = this.data.name; 
    this._cardImage.src = this.data.link; 
    this._cardImage.alt = this.data.name;
    this._countLike.textContent = this._likes.length;
    this._listUserLiked = this._generateListUserLiked(this._likes);
    if (this._listUserLiked.includes(this._user)) {
      this._buttonLike.classList.add('element__like_type_active');
    }
    this._setEventListeners();
    return this._cardElement;
  }

}

export { Card }