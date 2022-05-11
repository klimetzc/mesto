import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageSrc = this._popup.querySelector(".popup__image");
    this._imageCaption = this._popup.querySelector(".popup__caption");
  }

  open(currentImage, currentName) {
    document.addEventListener("keydown", (event) => {
      super._handleEscUp(event);
    });
    this._popup.classList.add("popup_opened");
    this.fillPopupImage(currentImage, currentName);

    // super.open(); keydown не работает
  }

  fillPopupImage(currentImage, currentName) {
    this._imageSrc.src = currentImage.src;
    this._imageCaption.textContent = currentName.alt;
    this._imageSrc.alt = currentName.alt;
  }
}
