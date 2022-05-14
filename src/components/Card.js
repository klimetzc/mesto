export default class Card {
  constructor(data, cardSelector, handleCardClick, addLike, removeLike, userId, popup) {
    this.data = data;
    this.cardID = data._id;
    this.ownerId = data.owner._id;
    this.userId = userId;
    this.image = data.link;
    this.name = data.name;
    this._element = document
      .querySelector(`${cardSelector}`)
      .content.querySelector(".element")
      .cloneNode(true);
    this._buttonLike = this._element.querySelector(".element__like");
    this._likesCount = this._element.querySelector(".element__like-label");
    this._buttonDelete = this._element.querySelector(".element__delete");
    this._elementImage = this._element.querySelector(".element__image");
    this._handleCardClick = handleCardClick;

    this._isLiked = data.likes.some((like) => like._id === this.userId);
    this._addLike = addLike;
    this._removeLike = removeLike;

    this.popupDelete = popup;
  }

  createCard(count = 0, id = this.userId) {
    if (this._isLiked) {
      this._buttonLike.classList.add("element__like_active");
    }
    this._elementImage.src = this.image;
    this._elementImage.alt = this.name;
    this._element.querySelector(".element__title").textContent = this.name;
    this._count = count;
    this._likesCount.textContent = count;
    this._id = id;

    if (this.userId !== this.ownerId) {
      this._buttonDelete.classList.add("element__delete_hidden");
    }

    const page = document.querySelector(".page");
    const isThemeChanged = page.classList.contains("theme_light");
    if (isThemeChanged) this._buttonLike.classList.add("element__like_theme_light");

    this._setEventListeners();
    return this._element;
  }

  _handleLikeButton = (event) => {
    if (event.target.classList.contains("element__like_active")) {
      this._removeLike(this.cardID)
        .then((response) => {
          event.target.classList.remove("element__like_active");
          this._count -= 1;
          this._likesCount.textContent = this._count;
          return response;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._addLike(this.cardID)
        .then((response) => {
          event.target.classList.add("element__like_active");
          this._count += 1;
          this._likesCount.textContent = this._count;
          return response;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  _handleDeleteButton(event) {
    console.log("CARD DATA");
    console.log(this.data);
    console.log(this.ownerId);
    this.popupDelete.open(this.cardID, event.target.closest(".element"));
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
    this._element.querySelector(".element__like").addEventListener("click", (event) => {
      console.log(this._id);
      this._handleLikeButton(event);
    });
    this._buttonDelete.addEventListener("click", (event) => {
      this._handleDeleteButton(event);
    });
    this._elementImage.addEventListener("click", this._handleCardClick);
  }
}
