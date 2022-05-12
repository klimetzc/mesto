import pageElements from "./pageElements.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import ThemeChanger from "./changeTheme.js";
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

function insertCard(card) {
  section.addItem(card);
}

function addPlace(data) {
  const card = {
    name: data.place,
    link: data.image,
  };
  console.log(data.place, data.image);
  insertCard(card);
  Card.checkEmpty();
}

function handleEditButton() {
  validatorEditForm.resetValidation();
  insertInfoFromPage();
  popupEdit.open();
}

function handleAddButton() {
  validatorAddForm.resetValidation();
  popupAdd.open();
}

function handleAddForm(inputValues) {
  addPlace(inputValues);
  popupAdd.close();
  validatorAddForm.resetValidation();
}

function handleEditForm(inputValues) {
  editProfile(inputValues);
  popupEdit.close();
}

function editProfile(data) {
  userInfo.setUserInfo({
    name: data.name,
    profession: data.profession,
  });
}

function insertInfoFromPage() {
  const data = userInfo.getUserInfo();
  pageElements.popupUsername.value = data.name;
  pageElements.popupProfession.value = data.profession;
}
