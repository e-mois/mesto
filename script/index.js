let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.popup__close-button');
let saveButton = document.querySelector('.popup__save-button');
let textTitle = document.querySelector('.profile__name');
let textAbout = document.querySelector('.profile__about');
let formElement = popup.querySelector('.popup__container');
let inputName = popup.querySelector('.popup__input_name');
let inputAbout = popup.querySelector('.popup__input_about');

function closePopup() {
  popup.classList.remove('popup_opened');
}

function openPopup() {
  popup.classList.add('popup_opened');
  inputName.value = textTitle.textContent;
  inputAbout.value = textAbout.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
  nameInput = popup.querySelector('.popup__input_name').value;
  jobInput = popup.querySelector('.popup__input_about').value;
  textTitle.textContent = nameInput;
  textAbout.textContent = jobInput;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler); 
