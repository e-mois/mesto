// Функция для показа ошибки валидации

const showInputError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${obj.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${obj.errorClass}`);
};

// Функция для скрытия ошибьки
const hideInputError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${obj.inputErrorClass}`);
  errorElement.classList.remove(`${obj.errorClass}`);
  errorElement.textContent = '';
};

// Проверка на валидность полей ввода
const checkInputValidity = (formElement, inputElement, obj) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  }
};

// Отслеживание ввода
const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(`${obj.inputElement}`));
  const buttonElement = formElement.querySelector(`${obj.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement, obj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, obj);
      toggleButtonState(inputList, buttonElement, obj);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  });
}

// Работа с кнопкой
const toggleButtonState = (inputList, buttonElement, obj) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${obj.inactiveButtonClass}`);
  } else {
    buttonElement.classList.remove(`${obj.inactiveButtonClass}`);
  }
}

function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(`${obj.formElement}`));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, obj);
  });
};


// Валидация форм

enableValidation({
  formElement: '.popup__container-form',
  inputElement: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
