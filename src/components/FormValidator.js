export default class FormValidator {
  constructor(data, formElement) {
    this.inputSelector = data.inputSelector;
    this.submitButtonSelector = data.submitButtonSelector;
    this.inactiveButtonClass = data.inactiveButtonClass;
    this.inputErrorClass = data.inputErrorClass;
    this.errorClass = data.errorClass;

    this._formElement = formElement;
    this._inputList = this._formElement.querySelectorAll(`${this.inputSelector}`);
    this._buttonElement = this._formElement.querySelector(`${this.submitButtonSelector}`);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${this.inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${this.errorClass}`);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${this.inputErrorClass}`);
    errorElement.classList.remove(`${this.errorClass}`);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  hideInputErrors() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }

  _setEventListeners() {
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this.toggleButtonState(this._inputList);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return Array.from(this._inputList).some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(`${this.inactiveButtonClass}`);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(`${this.inactiveButtonClass}`);
      this._buttonElement.disabled = false;
    }
  }

  enableValidation() {
    this._setEventListeners();
  }
}
