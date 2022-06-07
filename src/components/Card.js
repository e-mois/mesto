class Card {
  constructor(data, cardSelector, { handleCardClick, handleCardClickDelete, activateLike, disactivateLike }, user) {
    this._data = data;
    this._cardTemplate = document.querySelector(cardSelector);
    this._handleCardClick = handleCardClick;
    this._handleCardClickDelete = handleCardClickDelete;
    this._activateLike = activateLike;
    this._disactivateLike = disactivateLike;
    this._cardElement = this._cardTemplate.content.querySelector('.element').cloneNode(true);
    this._buttonLike = this._cardElement.querySelector('.element__like');
    this._buttonDelete = this._cardElement.querySelector('.element__trashbin');
    this._cardTitle = this._cardElement.querySelector('.element__title');
    this._cardImage = this._cardElement.querySelector('.element__image');
    this._countLike = this._cardElement.querySelector('.element__like-count');
    this._user = user;
    this._likes = this._data.likes;
    this._delPopup = document.querySelector('.popup__type_delete');
    this._listUserLiked = [];
  }


  // Добавление обработчиков для карточки
  _setEventListeners() {
    this._buttonLike.addEventListener('click', (evt) => {
      const eventTarget = evt.target;
      if (!eventTarget.classList.contains('element__like_type_active')) {
        this._activateLike(this._data._id)
        .then((res) => {
          eventTarget.classList.toggle('element__like_type_active');
          this._countLike.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
      } else {
        this._disactivateLike(this._data._id)
        .then((res) => {
          eventTarget.classList.toggle('element__like_type_active');
          this._countLike.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
      }
    });
    if (this._user === this._data.owner._id) {
      this._buttonDelete.classList.add('element__trashbin_visible');
      this._buttonDelete.addEventListener('click', (evt) => {
        this._handleCardClickDelete(this._data._id, evt.target.closest('.element'));
      });
    }
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    })
  }

  _generateListUserLiked(likeList) {
    const listUserLiked = [];
    likeList.forEach(element => {
      listUserLiked.push(element._id);
    });
    return listUserLiked;
  }

    // Создание карточки
  createCard() {
    this._cardTitle.textContent = this._data.name; 
    this._cardImage.src = this._data.link; 
    this._cardImage.alt = this._data.name;
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