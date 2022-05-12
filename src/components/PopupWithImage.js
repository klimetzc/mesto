import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageSrc = this._popup.querySelector(".popup__image");
    this._imageCaption = this._popup.querySelector(".popup__caption");
  }

  open(currentImage, currentName) {
    super.open();
    this.fillPopupImage(currentImage, currentName);
  }

  fillPopupImage(currentImage, currentName) {
    this._imageSrc.src = currentImage.src;
    this._imageCaption.textContent = currentName.alt;
    this._imageSrc.alt = currentName.alt;
  }
}
