import pageElements from "./pageElements.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import ThemeChanger from "./changeTheme.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import Api from "./components/Api.js";
import "./index.css";
import "core-js/stable";
import "regenerator-runtime/runtime";
import PopupWithConfirm from "./components/PopupWithConfirm.js";

// let initCards;

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-41",
  headers: {
    authorization: "ea87a304-62ec-4c62-9662-e334c0349881",
    "Content-Type": "application/json",
  },
});
let section;
let sessionUserID;

api
  .getCards()
  .then((data) => {
    section = new Section(
      {
        items: data,
        renderer: renderCard,
      },
      ".elements"
    );
    section.renderItems();
  })
  .catch((err) => {
    pageElements.noCardsText.textContent = `Ошибка: ${err}`;
    pageElements.noCardsText.style.display = "block";
  })
  .finally(() => {
    pageElements.elementsLoader.style.display = "none";
  });

const popupWithImage = new PopupWithImage(".popup_image");
popupWithImage.setEventListeners();

const popupEdit = new PopupWithForm(".popup_edit", handleEditForm, handleEditButton);
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm(".popup_add", handleAddForm, handleAddButton);
popupAdd.setEventListeners();

const popupAvatar = new PopupWithForm(".popup_avatar", handleAvatarForm, handleAvatarButton);
popupAvatar.setEventListeners();

const popupDelete = new PopupWithConfirm(".popup_delete", handleDelete);
popupDelete.setEventListeners();

const userInfo = new UserInfo(".profile__username", ".profile__profession");

api
  .getUserData()
  .then((data) => {
    initUserInfo(data.name, data.about, data.avatar, data._id);
  })
  .catch((err) => {
    console.log(err);
    pageElements.profileAvatar.src = "https://via.placeholder.com/150";
  });

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

const validatorAvatarForm = new FormValidator(
  {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  },
  pageElements.popupAvatar.querySelector(".popup__window > .popup__form")
);
validatorAvatarForm.enableValidation();

// FUNCTIONS

function renderCard(card, selector, count, id) {
  const newCard = new Card(
    card,
    selector,
    (event) => {
      popupWithImage.open(event.target, event.target);
    },
    api.addLike,
    api.removeLike,
    sessionUserID,
    popupDelete
  );
  return newCard.createCard(count, id);
}

function insertCard(card, isNew) {
  section.addItem(card, isNew);
}

function addPlace(data) {
  api
    .addCard(data.place, data.image, popupAdd.getPopupSubmitButton())
    .then((response) => {
      const card = {
        name: data.place,
        link: data.image,
      };
      insertCard(response, true);
      Card.checkEmpty();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAdd.close();
    });
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

function handleAvatarButton() {
  validatorAvatarForm.resetValidation();
  popupAvatar.open();
}

function handleAddForm(inputValues) {
  // const initText = popupAdd.getPopupSubmitButton().textContent;
  popupAdd.getPopupSubmitButton().textContent = "Загрузка..."; // DONE
  addPlace(inputValues);
  validatorAddForm.resetValidation();
}

function handleEditForm(inputValues) {
  popupEdit.getPopupSubmitButton().textContent = "Загрузка..."; // DONE
  editProfile(inputValues);
}

function handleAvatarForm(inputValues) {
  popupAvatar.getPopupSubmitButton().textContent = "Загрузка...";
  updateAvatar(inputValues);
}

function handleDelete(cardID, card) {
  popupDelete.getPopupSubmitButton().textContent = "Загрузка...";
  api
    .deleteCard(cardID, popupDelete.getPopupSubmitButton())
    .then((response) => {
      card.remove();
      return response;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupDelete.close();
    }); // DONE
}

function editProfile(data) {
  api
    .updateUserInfo(data.name, data.profession, popupEdit.getPopupSubmitButton())
    .then((response) => {
      userInfo.setUserInfo({
        name: data.name,
        profession: data.profession,
      });
      return response;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEdit.close();
    });
}

function updateAvatar(data) {
  api
    .updateUserAvatar(data.avatar, popupAvatar.getPopupSubmitButton())
    .then((response) => {
      pageElements.profileAvatar.src = data.avatar;
      return response;
    })
    .catch((err) => {
      console.log(err);
      console.log("avatar error");
    })
    .finally(() => {
      popupAvatar.close();
    });
}

function insertInfoFromPage() {
  const data = userInfo.getUserInfo();
  pageElements.popupUsername.value = data.name;
  pageElements.popupProfession.value = data.profession;
}

function initUserInfo(name, about, avatar, userId) {
  document.querySelector(".profile__username").textContent = name;
  document.querySelector(".profile__profession").textContent = about;
  document.querySelector(".profile__avatar").src = avatar;
  sessionUserID = userId;
}
