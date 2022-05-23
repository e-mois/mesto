export class UserInfo {
  constructor({ selectorName, selectorAbout }) {
    this._elemName = document.querySelector(selectorName);
    this._elemAbout = document.querySelector(selectorAbout);
  }

  getUserInfo() {
    const userInfoObj = {};
    userInfoObj['name'] = this._elemName.textContent;
    userInfoObj['about'] = this._elemAbout.textContent;
    return userInfoObj
  }

  _getInputValue() {
    const data = {};
    const popupOpened = document.querySelector('.popup_opened');
    console.log(popupOpened);
    data['name'] = popupOpened.querySelector('.popup__input_type_name').value;
    data['about'] = popupOpened.querySelector('.popup__input_type_about').value;
    console.log(data)
    return data;
  }

  setUserInfo(){
    const data = this._getInputValue();
    this._elemName.textContent = data.name;
    this._elemAbout.textContent = data.about;
  }

}