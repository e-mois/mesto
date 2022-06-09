import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ callbackFunction }, selector) {
    super(selector);
    this._submitButton = this.popup.querySelector('.popup__button');
    this._defaultTextButton = this._submitButton.textContent;
    this._callbackFunction = callbackFunction;

    this._formElement = this.popup.querySelector('.popup__container-form');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
  }

  _getInputValues = () => {
    const inputDataObj = {};
    this._inputList.forEach(input => {
      inputDataObj[input.name] = input.value;      
    });
    return inputDataObj
  }

  renderLoading(loading, text) {
    if (loading) {
      this._submitButton.textContent = text;
    } else {
      this._submitButton.textContent = this._defaultTextButton;
    }
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
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
