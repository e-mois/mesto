import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._imageOpened = this.popup.querySelector('.popup__image');
    this._imageDescription = this.popup.querySelector('.popup__description');
  }

  open = (data) => {
    super.open();
    this._imageOpened.src = data.link;
    this._imageOpened.alt = data.name;
    this._imageDescription.textContent = data.name;
  }

}