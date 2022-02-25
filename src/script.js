const page = document.querySelector(".page");

const popup = document.querySelector(".popup");
const popupCloseButton = document.querySelector(".popup__close-button");
let popupName = document.querySelector(".popup__input_type_name");
let popupProfession = document.querySelector(".popup__input_type_profession");
const popupWindow = document.querySelector(".popup__window");
const popupTransitionDuration = +parseFloat(getComputedStyle(popup).transitionDuration) * 1000;
const inputButtons = document.querySelectorAll(".popup__input");
const popupForm = document.querySelector(".popup__form");

const editButton = document.querySelector(".profile__edit-button");
const submitButton = document.querySelector(".popup__submit");
let username = document.querySelector(".profile__username");
let profession = document.querySelector(".profile__profession");
const likeButtons = document.querySelectorAll(".element__like");


popupName.value = username.textContent;
popupProfession.value = profession.textContent;

function closePopup() {
  setTimeout(() => {
    popup.classList.toggle("popup_closed");
    page.style.overflow = "auto";
    setTimeout(() => {
      popup.style.display = "none";
    }, popupTransitionDuration);
  }, 0);
}

function openPopup() {
  popup.style.display = "flex";
  setTimeout(() => {
    popup.classList.toggle("popup_closed");

    let popupWindowHeight = popupWindow.offsetHeight;
    let pageHeight = document.documentElement.clientHeight;
    let percentHeight = (popupWindowHeight / pageHeight * 100);

    if (percentHeight >= 100) {
      page.style.overflow = "hidden";
      popupForm.style.overflowY = "scroll";
    }
    setTimeout(() => {
      popup.style.display = "flex";
    }, popupTransitionDuration);
  }, 0);
}


editButton.addEventListener("click", (event) => { // fade IN
  openPopup();
});
popupCloseButton.addEventListener("click", (event) => { // fade OUT
  closePopup();
});
submitButton.addEventListener("click", (event) => {
  username.textContent = popupName.value;
  profession.textContent = popupProfession.value;
  closePopup();
});
inputButtons.forEach((item) => {
  item.addEventListener("input", () => {
    let errorsLength = document.querySelectorAll(".popup__input:invalid").length;
    if (errorsLength > 0) {
      submitButton.disabled = true;
    } else if (errorsLength === 0) {
      submitButton.disabled = false;
    }
  });
});


likeButtons.forEach((item) => {
  item.addEventListener("click", (event) => {
    if (!item.classList.contains("element__like_active")) { // Add like
      item.classList.add("element__like_active");
    } else if (item.classList.contains("element__like_active")) { // Remove like
      item.classList.remove("element__like_active");
    }
  });
});

