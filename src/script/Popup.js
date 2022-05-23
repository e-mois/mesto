export class Popup {
  constructor(selector) {
    this.popupSelector = selector;
    this.popup = document.querySelector(this.popupSelector);
  }

    // Закрытие при нажатии на крестик
  close() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  // Обработчик нажатия ESC
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // Открытие попапа
  open() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  setEventListeners() {
    this.popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          this.close()
      }
      if (evt.target.classList.contains('popup__close-button')) {
        this.close()
      }
    })
  }
}