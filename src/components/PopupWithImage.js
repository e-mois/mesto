import { Popup } from "./Popup.js";
import { imageOpened, imageDescription } from "../utils/constants.js";

export class PopupWithImage extends Popup {

  open = (data) => {
    super.open();
    imageOpened.src = data.link;
    imageOpened.alt = data.name;
    imageDescription.textContent = data.name;
  }

}