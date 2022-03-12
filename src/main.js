const page = document.querySelector(".page");
const editButton = document.querySelector(".profile__edit-button");
const likeButtons = document.querySelectorAll(".element__like");
const headerLogo = document.querySelector(".header__logo");
const addButton = document.querySelector(".profile__add-button");
const changeThemeButton = document.querySelector(".theme-changer");
const cardsContainer = document.querySelector(".elements");

let username = document.querySelector(".profile__username");
let profession = document.querySelector(".profile__profession");

const pageElements = {page, headerLogo, editButton, addButton, likeButtons, changeThemeButton};
export default pageElements;

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const initialPopups = [
  {
    class: "popupEdit",
    title: "Редактировать профиль",
    input1: "Ваше имя",
    input2: "Ваша профессия",
    submitText: "Сохранить",
    contentImage: null,
    caption: null
  },
  {
    class: "popupAdd",
    title: "Новое место",
    input1: "Название",
    input2: "Ссылка на картинку",
    submitText: "Создать",
    contentImage: null,
    caption: null
  },
  {
    class: "popupImage",
    title: null,
    input1: null,
    input2: null,
    submitText: null,
    contentImage: "https://via.placeholder.com/250",
    caption: "initial"
  }
];

for (let popup of initialPopups) {
  addPopup(popup);
}

for (let card of initialCards) {
  addCard(card);
}

const popupEdit = document.querySelector(".popupEdit");
const popupAdd = document.querySelector(".popupAdd");
const popupImage = document.querySelector(".popupImage");

let currentImage;
let currentName;

function addPopup(obj) {
  const template = document.querySelector("#popup").content;
  const content = template.querySelector(".popup").cloneNode(true);
  let popupFunction;
  switch (obj.class) {
    case "popupEdit":
      popupFunction = popupEditFunction;
      break;
    case "popupAdd":
      popupFunction = popupAddFunction;
      break;
    case "popupImage":
      popupFunction = popupImageFunction;
      break;
    default:
      console.log("Something gone wrong");
      break;
  }
  const popupTitle = content.querySelector(".popup__title");
  const popupInput1 = content.querySelector(".popup__input1");
  const popupInput2 = content.querySelector(".popup__input2");
  const submitButton = content.querySelector(".popup__submit");
  const contentImage = content.querySelector(".popup__image");
  const caption = content.querySelector(".popup__caption");
  const popupForm = content.querySelector(".popup__form");
  const closeButton = content.querySelector(".popup__close-button");
  const inputButtons = content.querySelectorAll(".popup__input");

  obj.title ? (popupTitle.textContent = obj.title) : popupTitle.remove();
  obj.input1 ? (popupInput1.placeholder = obj.input1) : popupInput1.remove();
  obj.input2 ? (popupInput2.placeholder = obj.input2) : popupInput2.remove();
  obj.contentImage ? (contentImage.src = obj.contentImage) : contentImage.remove();
  obj.caption ? (caption.textContent = obj.caption) : caption.remove();

  if (obj.submitText) {
    submitButton.textContent = obj.submitText;
    submitButton.addEventListener("click", () => {
      togglePopupVisibility(content, popupFunction);
    });
  } else {
    submitButton.remove();
  }

  popupForm.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  content.addEventListener("click", function (event) {
    // Close popup when overlay was clicked
    if (event.target.classList.contains("popup")) togglePopupVisibility(content);
  });

  closeButton.addEventListener("click", () => {
    togglePopupVisibility(content);
  });

  inputButtons.forEach(function (item) {
    // validation
    item.addEventListener("input", function () {
      let errorsLength = content.querySelectorAll(".popup__input:invalid").length;
      if (errorsLength > 0) {
        content.querySelector(".popup__submit").disabled = true;
      } else if (errorsLength === 0) {
        content.querySelector(".popup__submit").disabled = false;
      }
    });
  });

  content.classList.add(obj.class);
  page.append(content);
}

function addCard(obj) {
  let template = document.querySelector("#element").content;
  let content = template.querySelector(".element").cloneNode(true);
  content.querySelector(".element__image").src = obj.link;
  content.querySelector(".element__image").alt = obj.name;
  content.querySelector(".element__title").textContent = obj.name;
  content.querySelector(".element__like").addEventListener("click", (event) => {
    event.target.classList.toggle("element__like_active");
  });
  content.querySelector(".element__delete").addEventListener("click", (event) => {
    event.target.closest(".element").remove();
    checkEmpty();
  });
  content.querySelector(".element__image").addEventListener("click", (event) => {
    currentImage = event.target.src;
    currentName = event.target.alt;
    togglePopupVisibility(popupImage, popupImageFunction);
  });
  cardsContainer.append(content);

}

function togglePopupVisibility(popupName, popupFunction = undefined) {
  if (popupFunction) popupFunction(popupName);
  popupName.classList.toggle("popup_closed");
}

function popupEditFunction(popup) {

  if (popup.classList.contains("popup_closed")) {
    popup.querySelector(".popup__input1").value = username.textContent;
    popup.querySelector(".popup__input2").value = profession.textContent;
  }
  username.textContent = popup.querySelector(".popup__input1").value;
  profession.textContent = popup.querySelector(".popup__input2").value;
}

function popupAddFunction(popup) {
  const card = {
    name: popup.querySelector(".popup__input1").value,
    link: popup.querySelector(".popup__input2").value
  };
  addCard(card);
  checkEmpty();
  if (localStorage.hasOwnProperty("lightTheme")) {
    let likes = document.querySelectorAll(".element__like");
    likes[likes.length - 1].classList.add("element__like_theme_dark");
  }
}

function popupImageFunction(popup) {
  popup.querySelector(".popup__image").src = currentImage;
  popup.querySelector(".popup__caption").textContent = currentName;
}

function checkEmpty() {
  const text = document.querySelector(".elements__text");
  if (!document.querySelectorAll(".element").length) {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}

editButton.addEventListener("click", () => {
  togglePopupVisibility(popupEdit, popupEditFunction);
});
addButton.addEventListener("click", () => {
  togglePopupVisibility(popupAdd);
});
