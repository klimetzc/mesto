import * as pageElements from "./pageElements.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards } from "./cards.js";

const validatorAddForm = new FormValidator(
  {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  },
  pageElements.formAdd
);
const validatorEditForm = new FormValidator(
  {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  },
  pageElements.formEdit
);
validatorAddForm.enableValidation();
validatorEditForm.enableValidation();

function renderCard(card, selector) {
  const newCard = new Card(card, selector);
  return newCard.createCard();
}

function insertCard(card, selector, isPrepend = false) {
  if (isPrepend) {
    pageElements.cardsContainer.prepend(renderCard(card, selector));
  } else {
    pageElements.cardsContainer.append(renderCard(card, selector));
  }
}

for (const card of initialCards) {
  insertCard(card, "#element");
}

export function openPopup(popup) {
  document.addEventListener("keydown", handleEscUp);
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  document.removeEventListener("keydown", handleEscUp);
  popup.classList.remove("popup_opened");
}

function editProfile() {
  pageElements.username.textContent = pageElements.popupUsername.value;
  pageElements.profession.textContent = pageElements.popupProfession.value;
}

function insertInfoFromPage() {
  pageElements.popupUsername.value = pageElements.username.textContent;
  pageElements.popupProfession.value = pageElements.profession.textContent;
}

function addPlace() {
  const card = {
    name: pageElements.popupAdd.querySelector(".popup__input_type_place").value,
    link: pageElements.popupAdd.querySelector(".popup__input_type_place-image").value,
  };
  insertCard(card, "#element", true);
  checkEmpty();
}

export function fillPopupImage(currentImage, currentName) {
  pageElements.popupImageSrc.src = currentImage;
  pageElements.popupImageCaption.textContent = currentName;
  pageElements.popupImageSrc.alt = currentName;
}

export function checkEmpty() {
  // Adds the appropriate label if there are no cards
  if (!document.querySelectorAll(".element").length) {
    pageElements.noCardsText.style.display = "block";
  } else {
    pageElements.noCardsText.style.display = "none";
  }
}

// HANDLERS
function handleEscUp(event) {
  if (event.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
}

function handleEditButton() {
  validatorEditForm.toggleButtonState();
  validatorEditForm.hideInputErrors();
  insertInfoFromPage();
  openPopup(pageElements.popupEdit);
}

function handleAddButton() {
  validatorAddForm.toggleButtonState();
  validatorAddForm.hideInputErrors();
  openPopup(pageElements.popupAdd);
}

function handleAddForm() {
  closePopup(pageElements.popupAdd);
  addPlace();
  pageElements.formAdd.reset();
  validatorAddForm.toggleButtonState();
}

function handleEditForm(event) {
  event.preventDefault();
  closePopup(pageElements.popupEdit);
  editProfile();
}

function handleClosePopup(event) {
  const currentPopup = event.target.closest(".popup");
  const isClosable =
    event.target.classList.contains("popup") ||
    event.target.classList.contains("popup__close-button");
  if (isClosable) closePopup(currentPopup);
}

// SET LISTENERS
pageElements.buttonEdit.addEventListener("click", handleEditButton);
pageElements.buttonAdd.addEventListener("click", handleAddButton);
pageElements.popups.forEach((item) => {
  item.addEventListener("click", handleClosePopup);
});
pageElements.formAdd.addEventListener("submit", handleAddForm);
pageElements.formEdit.addEventListener("submit", handleEditForm);
