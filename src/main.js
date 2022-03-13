const page = document.querySelector(".page"); // export
const headerLogo = document.querySelector(".header__logo"); // export

const changeThemeButton = document.querySelector(".theme-changer"); // export
const cardsContainer = document.querySelector(".elements");

const editButton = document.querySelector(".profile__edit-button"); // export
const addButton = document.querySelector(".profile__add-button"); // export

const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupImage = document.querySelector(".popup_image");

const popups = document.querySelectorAll(".popup");
const closeButtons = document.querySelectorAll(".popup__close-button");
const popupsForms = document.querySelectorAll(".popup__form");
const noCardsText = document.querySelector(".elements__text");

const addForm = popupAdd.querySelector(".popup__window > .popup__form");
const editForm = popupEdit.querySelector(".popup__window > .popup__form");
const popupImageSrc = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const popupUsername = document.querySelector(".popup__input_type_username");
const popupProfession = document.querySelector(".popup__input_type_profession");

const username = document.querySelector(".profile__username");
const profession = document.querySelector(".profile__profession");

// test for theme changer
const pageElements = {page, headerLogo, editButton, addButton, changeThemeButton};
export default pageElements;

const initialCards = [
  {
    name: "Мурманск",
    link: "https://images.unsplash.com/photo-1601291680100-2c14b5865905?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
  },
  {
    name: "Санкт-Петербург",
    link: "https://images.unsplash.com/photo-1555460285-763ba96917d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
  },
  {
    name: "Москва",
    link: "https://images.unsplash.com/photo-1541447271487-09612b3f49f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
  },
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

function createCard(data) {
  const template = document.querySelector("#element").content;
  const card = template.querySelector(".element").cloneNode(true);
  const like = card.querySelector(".element__like");
  const elementImage = card.querySelector(".element__image");
  elementImage.src = data.link;
  elementImage.alt = data.name;
  card.querySelector(".element__title").textContent = data.name;
  like.addEventListener("click", (event) => {
    event.target.classList.toggle("element__like_active");
  });
  card.querySelector(".element__delete").addEventListener("click", (event) => {
    event.target.closest(".element").remove();
    checkEmpty();
  });
  elementImage.addEventListener("click", (event) => {
    togglePopupVisibility(popupImage);
    fillPopupImage(event.target.src, event.target.alt);
  });

  const isThemeChanged = pageElements.page.classList.contains("theme_light");
  if (isThemeChanged) {
    like.classList.add("element__like_theme_light");
  }
  return card;
}

function togglePopupVisibility(popup) {
  popup.classList.toggle("popup_opened");
}

function editProfile() {
  username.textContent = popupUsername.value;
  profession.textContent = popupProfession.value;
}

function insertInfoFromPage() {
  popupUsername.value = username.textContent;
  popupProfession.value = profession.textContent;
}

function addPlace() {
  const card = {
    name: popupAdd.querySelector(".popup__input_type_place").value,
    link: popupAdd.querySelector(".popup__input_type_place-image").value
  };
  const newCard = createCard(card);
  cardsContainer.prepend(newCard);
  checkEmpty();
}

function fillPopupImage(currentImage, currentName) {
  popupImageSrc.src = currentImage;
  popupImageCaption.textContent = currentName;
  popupImageSrc.alt = currentName;
}

function checkEmpty() {
  // Adds the appropriate label if there are no cards
  if (!document.querySelectorAll(".element").length) {
    noCardsText.style.display = "block";
  } else {
    noCardsText.style.display = "none";
  }
}

for (const card of initialCards) {
  const newCard = createCard(card);
  cardsContainer.append(newCard);
}

editButton.addEventListener("click", () => {
  insertInfoFromPage();
  togglePopupVisibility(popupEdit);
});

addButton.addEventListener("click", () => {
  togglePopupVisibility(popupAdd);
});

closeButtons.forEach((item) => {
  item.addEventListener("click", (event) => {
    const popup = item.closest(".popup");
    togglePopupVisibility(popup);
  });
});

popups.forEach((item) => {
  // overlay clicked
  item.addEventListener("click", (event) => {
    if (event.target.classList.contains("popup")) togglePopupVisibility(event.target);
  });
});

popupsForms.forEach((item) => {
  item.addEventListener("submit", (event) => {
    event.preventDefault();
  });
});


addForm.addEventListener("submit", (event) => {
  togglePopupVisibility(popupAdd);
  addPlace();
});

editForm.addEventListener("submit", (event) => {
  togglePopupVisibility(popupEdit);
  editProfile();
});