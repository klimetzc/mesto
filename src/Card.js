import * as pageElements from "./pageElements.js";
import { fillPopupImage, checkEmpty, openPopup } from "./main.js";

export default class Card {
  constructor(data, cardSelector) {
    this.image = data.link;
    this.name = data.name;
    this._element = document
      .querySelector(`${cardSelector}`)
      .content.querySelector(".element")
      .cloneNode(true);
    this._buttonLike = this._element.querySelector(".element__like");
    this._buttonDelete = this._element.querySelector(".element__delete");
    this._elementImage = this._element.querySelector(".element__image");
  }

  createCard() {
    this._elementImage.src = this.image;
    this._elementImage.alt = this.name;
    this._element.querySelector(".element__title").textContent = this.name;

    const isThemeChanged = pageElements.page.classList.contains("theme_light");
    if (isThemeChanged) this._buttonLike.classList.add("element__like_theme_light");

    this._setEventListeners();
    return this._element;
  }

  _handleLikeButton(event) {
    event.target.classList.toggle("element__like_active");
  }

  _handleDeleteButton(event) {
    event.target.closest(".element").remove();
    checkEmpty();
  }

  _handleImageClick(event) {
    openPopup(pageElements.popupImage);
    fillPopupImage(event.target.src, event.target.alt);
  }

  _setEventListeners() {
    this._element.querySelector(".element__like").addEventListener("click", this._handleLikeButton);
    this._buttonDelete.addEventListener("click", this._handleDeleteButton);
    this._elementImage.addEventListener("click", this._handleImageClick);
  }
}
