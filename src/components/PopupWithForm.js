import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback, labelButtonCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._name = popupSelector.slice(7); // popup__ + ${label}
    this._popupLabelButton = document.querySelector(`.profile__${this._name}-button`);
    this._formSubmitCallback = formSubmitCallback;
    this._labelButtonCallback = labelButtonCallback;
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._open = super.open.bind(this);
  }

  _getInputValues() {
    return Array.from(this._inputList).map((inuptElement) => {
      return inuptElement.value;
    });
  }

  setEventListeners() {
    document.addEventListener("keydown", (event) => {
      super._handleEscUp(event);
    });
    this._popup.addEventListener("submit", this._formSubmitCallback);
    this._popup.addEventListener("click", this._handleClosePopup);
    this._popupLabelButton.addEventListener("click", this._labelButtonCallback);
  }

  close() {
    document.removeEventListener("keydown", this._handleEscUp);
    this._popup.classList.remove("popup_opened");
    this._form.reset();
  }
}
