export default class FormValidator {
  constructor(data) {
    this.formSelector = data.formSelector;
    this.inputSelector = data.inputSelector;
    this.submitButtonSelector = data.submitButtonSelector;
    this.inactiveButtonClass = data.inactiveButtonClass;
    this.inputErrorClass = data.inputErrorClass;
    this.errorClass = data.errorClass;

    this.formElement = document.querySelector(`${this.formSelector}`);
    this.inputList = this.formElement.querySelectorAll(`${this.inputSelector}`);
    this.buttonElement = this.formElement.querySelector(`${this.submitButtonSelector}`);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${this.inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${this.errorClass}`);
  }

  _hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
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

  _setEventListeners() {
    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._toggleButtonState(this.inputList);
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return Array.from(this.inputList).some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this.inputList)) {
      this.buttonElement.classList.add(`${this.inactiveButtonClass}`);
      this.buttonElement.disabled = true;
    } else {
      this.buttonElement.classList.remove(`${this.inactiveButtonClass}`);
      this.buttonElement.disabled = false;
    }
  }

  enableValidation() {
    this._setEventListeners();
  }
}
