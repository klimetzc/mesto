import * as pE from "./pageElements.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const addValidation = new FormValidator({
  formSelector: ".popup__form_add",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
const editValidation = new FormValidator({
  formSelector: ".popup__form_edit",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
addValidation.enableValidation();
editValidation.enableValidation();


for (const card of initialCards) {
  const newCard = new Card(card, "#element");
  pE.cardsContainer.append(newCard.createCard());
}

export function togglePopupVisibility(popup) {
  if (!popup.classList.contains("popup_opened")) {
    document.addEventListener("keydown", handleEscUp);
  } else {
    document.removeEventListener("keydown", handleEscUp);
  }

  popup.classList.toggle("popup_opened");
}

function editProfile() {
  pE.username.textContent = pE.popupUsername.value;
  pE.profession.textContent = pE.popupProfession.value;
}

function insertInfoFromPage() {
  pE.popupUsername.value = pE.username.textContent;
  pE.popupProfession.value = pE.profession.textContent;
}

function addPlace() {
  const card = {
    name: pE.popupAdd.querySelector(".popup__input_type_place").value,
    link: pE.popupAdd.querySelector(".popup__input_type_place-image").value,
  };
  const newCard = new Card(card, "#element");
  pE.cardsContainer.prepend(newCard.createCard());
  checkEmpty();
}

export function fillPopupImage(currentImage, currentName) {
  pE.popupImageSrc.src = currentImage;
  pE.popupImageCaption.textContent = currentName;
  pE.popupImageSrc.alt = currentName;
}

export function checkEmpty() {
  // Adds the appropriate label if there are no cards
  if (!document.querySelectorAll(".element").length) {
    pE.noCardsText.style.display = "block";
  } else {
    pE.noCardsText.style.display = "none";
  }
}

// HANDLERS
function handleEscUp(event) {
  const activePopup = document.querySelector(".popup_opened");
  if (event.key === "Escape") {
    togglePopupVisibility(activePopup);
  }
}

function handleEditButton() {
  insertInfoFromPage();
  togglePopupVisibility(pE.popupEdit);
  pE.editSubmitButton.classList.remove("popup__submit_inactive");
  pE.popupEdit.querySelectorAll(".popup__error-message").forEach((elem) => {
    elem.classList.remove("form__input-error_active");
    elem.textContent = "";
  });
}

function handleAddButton() {
  togglePopupVisibility(pE.popupAdd);
}

function handleCloseButton(event) {
  const popup = event.target.closest(".popup");
  togglePopupVisibility(popup);
}

function handleAddForm() {
  togglePopupVisibility(pE.popupAdd);
  addPlace();
  pE.addForm.reset();
}

function handleEditForm() {
  togglePopupVisibility(pE.popupEdit);
  editProfile();
}

function handleClickedOverlay(event) {
  if (event.target.classList.contains("popup")) togglePopupVisibility(event.target);
}

// SET LISTENERS
pE.editButton.addEventListener("click", handleEditButton);
pE.addButton.addEventListener("click", handleAddButton);
pE.closeButtons.forEach((item) => {
  item.addEventListener("click", handleCloseButton);
});
pE.popups.forEach((item) => {
  item.addEventListener("click", handleClickedOverlay);
});
pE.addForm.addEventListener("submit", handleAddForm);
pE.editForm.addEventListener("submit", handleEditForm);
