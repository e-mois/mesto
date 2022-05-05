class FormValidator {
  constructor(objSelectors, formElement) {
    this._objSelectors = objSelectors;
    this._formElement = formElement;
  }

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._objSelectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._objSelectors.errorClass);
  };
  
  // Функция для скрытия ошибьки
  _hideInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._objSelectors.inputErrorClass);
    errorElement.classList.remove(this._objSelectors.errorClass);
    errorElement.textContent = '';
  };
  
  // Проверка на валидность полей ввода
  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  // Отслеживание ввода
  _setEventListeners = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._objSelectors.inputElement));
    const buttonElement = this._formElement.querySelector(this._objSelectors.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    });
  }
  
  // Работа с кнопкой
  _toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._objSelectors.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._objSelectors.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
  
  enableValidation = () => {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    _setEventListeners();
  };
}

export { FormValidator }