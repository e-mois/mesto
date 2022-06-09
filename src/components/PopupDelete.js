import { Popup } from "./Popup.js";

export class PopupDelete extends Popup {
  constructor({ callbackFunction }, selector) {
    super(selector)
    this.cardID = 0;
    this.targetElement = '';
    this._submitButton = this.popup.querySelector('.popup__button');
    this._defaultTextButton = this._submitButton.textContent;
    this._callbackFunction = callbackFunction;
  }

  renderLoading(loading, text) {
    if (loading) {
      this._submitButton.textContent = text;
    } else {
      this._submitButton.textContent = this._defaultTextButton;
    }
  }

  setEventListeners() {
    this._submitButton.addEventListener('click', () => {
      this._callbackFunction(this);
    });
    super.setEventListeners();
  }

}