import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ callbackFunction }, selector) {
    super(selector);
    this._callbackFunction = callbackFunction;

    this._formElement = document.querySelector(selector).querySelector('.popup__container-form');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
  }

  _getInputValues = () => {
    const inputDataObj = {};
    this._inputList.forEach(input => {
      inputDataObj[input.name] = input.value;      
    });
    return inputDataObj
  }

  setEventListeners = () => {
    this._formElement.addEventListener('submit', () => {
      this._callbackFunction(this._getInputValues());
    });
    super.setEventListeners();
  }

  close = () => {
    super.close();
    this._formElement.reset();
  }
}