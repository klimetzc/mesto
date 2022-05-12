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
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", () => {
      this._formSubmitCallback(this._getInputValues());
    });

    this._popupLabelButton.addEventListener("click", this._labelButtonCallback);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
