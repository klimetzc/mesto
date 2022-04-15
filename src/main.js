import * as pageElements from "./pageElements.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const validatorAddForm = new FormValidator(
  {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  },
  ".popup__form_add"
);
const validatorEditForm = new FormValidator(
  {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  },
  ".popup__form_edit"
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
  validatorEditForm.checkFormValidity();
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
  insertInfoFromPage();
  openPopup(pageElements.popupEdit);
}

function handleAddButton() {
  openPopup(pageElements.popupAdd);
}

function handleCloseButton(event) {
  const popup = event.target.closest(".popup");
  closePopup(popup);
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

function handleClickedOverlay(event) {
  if (event.target.classList.contains("popup")) closePopup(event.target);
}

// SET LISTENERS
pageElements.buttonEdit.addEventListener("click", handleEditButton);
pageElements.buttonAdd.addEventListener("click", handleAddButton);
pageElements.buttonsClose.forEach((item) => {
  item.addEventListener("click", handleCloseButton);
});
pageElements.popups.forEach((item) => {
  item.addEventListener("click", handleClickedOverlay);
});
pageElements.formAdd.addEventListener("submit", handleAddForm);
pageElements.formEdit.addEventListener("submit", handleEditForm);
