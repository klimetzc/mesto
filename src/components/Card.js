export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this.image = data.link;
    this.name = data.name;
    this._element = document
      .querySelector(`${cardSelector}`)
      .content.querySelector(".element")
      .cloneNode(true);
    this._buttonLike = this._element.querySelector(".element__like");
    this._buttonDelete = this._element.querySelector(".element__delete");
    this._elementImage = this._element.querySelector(".element__image");
    this._handleCardClick = handleCardClick;
  }

  createCard() {
    this._elementImage.src = this.image;
    this._elementImage.alt = this.name;
    this._element.querySelector(".element__title").textContent = this.name;

    const page = document.querySelector(".page");
    const isThemeChanged = page.classList.contains("theme_light");
    if (isThemeChanged) this._buttonLike.classList.add("element__like_theme_light");

    this._setEventListeners();
    return this._element;
  }

  _handleLikeButton(event) {
    event.target.classList.toggle("element__like_active");
  }

  _handleDeleteButton(event) {
    event.target.closest(".element").remove();
    Card.checkEmpty();
  }

  static checkEmpty() {
    // Adds the appropriate label if there are no cards
    const noCardsText = document.querySelector(".elements__text");
    if (!document.querySelectorAll(".element").length) {
      noCardsText.style.display = "block";
    } else {
      noCardsText.style.display = "none";
    }
  }

  _setEventListeners() {
    this._element.querySelector(".element__like").addEventListener("click", this._handleLikeButton);
    this._buttonDelete.addEventListener("click", this._handleDeleteButton);
    this._elementImage.addEventListener("click", this._handleCardClick);
  }
}
