export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(`${popupSelector}`);
    this._selector = popupSelector;
    this._closeButton = this._popup.querySelector(".popup__close-button");
    this._handleClosePopup.bind(this);
  }

  open() {
    document.addEventListener("keydown", this._handleEscUp);
    this._popup.classList.add("popup_opened");
  }

  close() {
    document.removeEventListener("keydown", this._handleEscUp);
    this._popup.classList.remove("popup_opened");
  }

  _handleEscUp = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };

  getPopupSubmitButton = () => {
    return this._popup.querySelector(".popup__submit");
  };

  _handleClosePopup = (event) => {
    const isClosable =
      event.target.classList.contains("popup") ||
      event.target.classList.contains("popup__close-button");
    if (isClosable) {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener("click", this._handleClosePopup);
  }
}
