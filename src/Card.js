import * as pE from "./pageElements.js";
import { togglePopupVisibility, fillPopupImage, checkEmpty } from "./main.js";

export default class Card {
  constructor(data, cardSelector) {
    this.image = data.link;
    this.name = data.name;
    this._cardSelector = cardSelector;
  }

  createCard() {
    const card = document
      .querySelector(`${this._cardSelector}`)
      .content.querySelector(".element")
      .cloneNode(true);
    this._element = card;
    const like = card.querySelector(".element__like");
    const elementImage = card.querySelector(".element__image");
    elementImage.src = this.image;
    elementImage.alt = this.name;
    card.querySelector(".element__title").textContent = this.name;

    const isThemeChanged = pE.page.classList.contains("theme_light");
    if (isThemeChanged) like.classList.add("element__like_theme_light");

    this._setEventListeners();
    return card;
  }

  _handleLikeButton(event) {
    event.target.classList.toggle("element__like_active");
  }

  _handleDeleteButton(event) {
    event.target.closest(".element").remove();
    checkEmpty();
  }

  _handleImageClick(event) {
    togglePopupVisibility(pE.popupImage);
    fillPopupImage(event.target.src, event.target.alt);
  }

  _setEventListeners() {
    this._element.querySelector(".element__like").addEventListener("click", this._handleLikeButton);
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", this._handleDeleteButton);
    this._element
      .querySelector(".element__image")
      .addEventListener("click", this._handleImageClick);
  }
}
