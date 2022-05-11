const pageElements = {
  page: document.querySelector(".page"),
  headerLogo: document.querySelector(".header__logo"),

  buttonChangeTheme: document.querySelector(".theme-changer"),
  cardsContainer: document.querySelector(".elements"),

  buttonEdit: document.querySelector(".profile__edit-button"),
  buttonAdd: document.querySelector(".profile__add-button"),

  popupEdit: document.querySelector(".popup_edit"),
  popupAdd: document.querySelector(".popup_add"),
  popupImage: document.querySelector(".popup_image"),

  popups: document.querySelectorAll(".popup"),
  buttonsClose: document.querySelectorAll(".popup__close-button"),
  noCardsText: document.querySelector(".elements__text"),

  get formAdd() {
    this.popupAdd.querySelector(".popup__window > .popup__form");
  },
  get formEdit() {
    this.popupEdit.querySelector(".popup__window > .popup__form");
  },
  SubmitButtonEdit: document.querySelector(".popup__submit_edit"),
  popupImageSrc: document.querySelector(".popup__image"),
  popupImageCaption: document.querySelector(".popup__caption"),
  popupUsername: document.querySelector(".popup__input_type_username"),
  popupProfession: document.querySelector(".popup__input_type_profession"),

  username: document.querySelector(".profile__username"),
  profession: document.querySelector(".profile__profession"),
};

export default pageElements;
