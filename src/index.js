import pageElements from "./pageElements.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import ThemeChanger from "./changeTheme.js";
import Popup from "./components/Popup.js";
import Section from "./components/Section.js";
import initialCards from "./cards.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import "./index.css";

const popupWithImage = new PopupWithImage(".popup_image");
popupWithImage.setEventListeners();

const popupEdit = new PopupWithForm(".popup_edit", handleEditForm, handleEditButton);
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm(".popup_add", handleAddForm, handleAddButton);
popupAdd.setEventListeners();

const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".elements"
);
section.renderItems();

const userInfo = new UserInfo(".profile__username", ".profile__profession");

const themeChanger = new ThemeChanger({
  page: pageElements.page,
  headerLogo: pageElements.headerLogo,
  buttonEdit: pageElements.buttonEdit,
  buttonAdd: pageElements.buttonAdd,
  buttonChangeTheme: pageElements.buttonChangeTheme,
});
themeChanger.enableThemeChanger();

const validatorAddForm = new FormValidator(
  {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  },
  pageElements.popupAdd.querySelector(".popup__window > .popup__form")
);
validatorAddForm.enableValidation();

const validatorEditForm = new FormValidator(
  {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  },
  pageElements.popupEdit.querySelector(".popup__window > .popup__form")
);
validatorEditForm.enableValidation();

// FUNCTIONS

function renderCard(card, selector) {
  const newCard = new Card(card, selector, (event) => {
    popupWithImage.open(event.target, event.target);
  });
  return newCard.createCard();
}

function insertCard(card, selector, isPrepend = false) {
  if (isPrepend) {
    pageElements.cardsContainer.prepend(renderCard(card, selector));
  } else {
    pageElements.cardsContainer.append(renderCard(card, selector));
  }
}

function addPlace() {
  const card = {
    name: pageElements.popupAdd.querySelector(".popup__input_type_place").value,
    link: pageElements.popupAdd.querySelector(".popup__input_type_place-image").value,
  };
  insertCard(card, "#element", true);
  Card.checkEmpty();
}

function handleEditButton() {
  validatorEditForm.toggleButtonState();
  validatorEditForm.hideInputErrors();
  insertInfoFromPage();
  popupEdit.open();
}

function handleAddButton() {
  validatorAddForm.toggleButtonState();
  validatorAddForm.hideInputErrors();
  popupAdd.open();
}

function handleAddForm() {
  addPlace();
  popupAdd.close();
  validatorAddForm.toggleButtonState();
}

function handleEditForm(event) {
  event.preventDefault();
  editProfile();
  popupEdit.close();
}

function handleClosePopup(event) {
  const currentPopup = event.target.closest(".popup");
  const isClosable =
    event.target.classList.contains("popup") ||
    event.target.classList.contains("popup__close-button");
  if (isClosable) this.close();
}

function editProfile() {
  userInfo.setUserInfo({
    name: pageElements.popupUsername.value,
    profession: pageElements.popupProfession.value,
  });
}

function insertInfoFromPage() {
  const data = userInfo.getUserInfo();
  pageElements.popupUsername.value = data.name;
  pageElements.popupProfession.value = data.profession;
}
