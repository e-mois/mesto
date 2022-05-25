class FormValidator {
  constructor(objSelectors, formElement) {
    this._objSelectors = objSelectors;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._objSelectors.inputElement));
    this._buttonElement = this._formElement.querySelector(this._objSelectors.submitButtonSelector);
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._objSelectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._objSelectors.errorClass);
  };
  
  // Функция для скрытия ошибьки
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._objSelectors.inputErrorClass);
    errorElement.classList.remove(this._objSelectors.errorClass);
    errorElement.textContent = '';
  };
  
  // Проверка на валидность полей ввода
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
  
  // Отслеживание ввода
  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };
  
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    });
  }
  
  // Работа с кнопкой
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._objSelectors.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._objSelectors.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  resetValidation = () => {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

  }
  
  enableValidation = () => {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
}

export { FormValidator }