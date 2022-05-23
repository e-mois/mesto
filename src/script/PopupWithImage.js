import { Popup } from "./Popup.js";
import { imageOpened, imageDescription } from "./constants.js";

export class PopupWithImage extends Popup {
  constructor(cardItem, selector) {
    super(selector);
    this._cardItem = cardItem;
  }

  open = () => {
    super.open();
    imageOpened.src = this._cardItem.link;
    imageOpened.alt = this._cardItem.name;
    imageDescription.textContent = this._cardItem.name;
    
    super.setEventListeners();
  }

}