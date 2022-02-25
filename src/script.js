let page = document.querySelector(".page");

let popup = document.querySelector(".popup");
let popupCloseButton = document.querySelector(".popup__close-button");
let popupName = document.querySelector(".popup__name");
let popupProfession = document.querySelector(".popup__profession");
let popupWindow = document.querySelector(".popup__window");
let popupTransitionDuration = +parseFloat(getComputedStyle(popup).transitionDuration) * 1000;
let inputButtons = document.querySelectorAll(".popup__input");
let popupForm = document.querySelector(".popup__form");

let editButton = document.querySelector(".profile__edit-button");
let submitButton = document.querySelector(".popup__submit");
let username = document.querySelector(".profile__username");
let profession = document.querySelector(".profile__profession");
let likeButtons = document.querySelectorAll(".element__like");


popupName.value = username.textContent;
popupProfession.value = profession.textContent;
popup.style.display = "flex";

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
    page.style.overflow = "hidden";
    let popupWindowHeight = popupWindow.offsetHeight;
    let pageHeight = document.documentElement.clientHeight;
    let percentHeight = (popupWindowHeight / pageHeight * 100);

    if (percentHeight >= 100) {
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

let activeLikeContent = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" viewBox="0 0 22 19" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.2991 1.68186C22.567 3.90213 22.567 7.54338 20.2991 9.78586L10.9804 19L1.6841 9.80806C0.606277 8.72013 0 7.27695 0 5.74496C0 4.21297 0.583823 2.76979 1.6841 1.68186C3.92957 -0.560619 7.61215 -0.560619 9.88007 1.70406L10.9804 2.792L12.0806 1.68186C14.3486 -0.560619 18.0311 -0.560619 20.2991 1.68186Z" fill="currentColor"/>
</svg>`;
let emptyLikeContent = `<svg width="22" height="19" viewBox="0 0 22 19">
        <path fill-rule="nonzero"
              d="M20.2991 9.78586C22.567 7.54338 22.567 3.90213 20.2991 1.68186C18.0311 -0.560619 14.3486 -0.560619 12.0806 1.68186L10.9804 2.792L9.88007 1.70406C7.61215 -0.560619 3.92957 -0.560619 1.6841 1.68186C0.583822 2.76979 0 4.21297 0 5.74496C0 7.27695 0.606277 8.72013 1.6841 9.80806L10.9804 19L20.2991 9.78586ZM1.4371 5.74496C1.4371 4.59042 1.8862 3.52469 2.71702 2.72539C3.5703 1.88168 4.67058 1.45983 5.77086 1.45983C6.87114 1.45983 7.97142 1.88168 8.8247 2.72539L10.9804 4.83465L13.136 2.70318C14.8201 1.03798 17.582 1.03798 19.2437 2.70318C20.0521 3.50248 20.5236 4.56821 20.5236 5.72276C20.5236 6.8773 20.0745 7.94303 19.2437 8.74233L10.9804 16.9351L2.71702 8.76453C1.90865 7.94303 1.4371 6.8773 1.4371 5.74496Z"
              fill="currentColor"/>
      </svg>`;

likeButtons.forEach((item) => {
  item.addEventListener("click", (event) => {
    if (!item.classList.contains(".element_like_active")) { // Add like
      item.innerHTML = activeLikeContent;
      item.classList.add(".element_like_active");
    } else if (item.classList.contains(".element_like_active")) { // Remove like
      item.innerHTML = emptyLikeContent;
      item.classList.remove(".element_like_active");
    }
  });
});

