let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit');
let closeButton = popup.querySelector('.popup__close-button');
let textTitle = document.querySelector('.profile__name');
let textAbout = document.querySelector('.profile__about');
let formElement = popup.querySelector('.popup__container-form');
let inputName = popup.querySelector('.popup__input_type_name');
let inputAbout = popup.querySelector('.popup__input_type_about');

function closePopup() {
  popup.classList.remove('popup_opened');
}

function openPopup() {
  inputName.value = textTitle.textContent;
  inputAbout.value = textAbout.textContent;
  popup.classList.add('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
  textTitle.textContent = inputName.value;
  textAbout.textContent = inputAbout.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler); 
