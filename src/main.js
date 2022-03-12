const page = document.querySelector(".page");
const editButton = document.querySelector(".profile__edit-button");
const likeButtons = document.querySelectorAll(".element__like");
const headerLogo = document.querySelector(".header__logo");
const addButton = document.querySelector(".profile__add-button");
const changeThemeButton = document.querySelector(".theme-changer");
const cardsContainer = document.querySelector(".elements");

const popupEdit = document.querySelector(".popup_Edit");
const popupAdd = document.querySelector(".popup_Add");
const popupImage = document.querySelector(".popup_Image");

const closeButtons = document.querySelectorAll(".popup__close-button");
const popups = document.querySelectorAll(".popup");
const forms = document.querySelectorAll(".popup__form");

const addSubmit = document.querySelector(".popup__submit_add");
const editSubmit = document.querySelector(".popup__submit_edit");
const popupImageSrc = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const popupUsername = document.querySelector(".popup__input_type_username");
const popupProfession = document.querySelector(".popup__input_type_profession");
const username = document.querySelector(".profile__username");
const profession = document.querySelector(".profile__profession");

// test for theme changer
const pageElements = {page, headerLogo, editButton, addButton, likeButtons, changeThemeButton};
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

function createCard(obj) {
  const template = document.querySelector("#element").content;
  const content = template.querySelector(".element").cloneNode(true);
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
    togglePopupVisibility(popupImage, fillPopupImage(event.target.src, event.target.alt));
  });
  const like = content.querySelector(".element__like");
  const isThemeChanged = pageElements.page.classList.contains("theme_light");
  if (isThemeChanged) {
    like.classList.add("element__like_theme_light");
  }
  return content;
}

function togglePopupVisibility(popupName, popupFunction = undefined) {
  // Hides\shows the window and calls the corresponding function on it
  if (popupFunction) popupFunction(popupName);
  popupName.classList.toggle("popup_opened");
}

function editProfile() {
  username.textContent = popupUsername.value;
  profession.textContent = popupProfession.value;
}

function insertInfoFromPage() {
  if (!popupEdit.classList.contains("popup_opened")) {
    popupUsername.value = username.textContent;
    popupProfession.value = profession.textContent;
  }
}

function addPlace() {
  const card = {
    name: popupAdd.querySelector(".popup__input_type_place").value,
    link: popupAdd.querySelector(".popup__input_type_placeImage").value
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
  const text = document.querySelector(".elements__text");
  if (!document.querySelectorAll(".element").length) {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}

for (let card of initialCards) {
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
    const popup = event.target.closest(".popup");
    if (event.target.classList.contains("popup")) togglePopupVisibility(popup);
  });
});

addSubmit.addEventListener("click", (event) => {
  togglePopupVisibility(popupAdd, addPlace);
});

editSubmit.addEventListener("click", (event) => {
  togglePopupVisibility(popupEdit, editProfile);
});

forms.forEach((item) => {
  item.addEventListener("submit", (event) => {
    event.preventDefault();
  });
});

/*
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
*/
/*
function addPopup(obj) {
  const template = document.querySelector("#popup").content;
  const content = template.querySelector(".popup").cloneNode(true);
  let popupFunction;
  switch (obj.class) {
    case "popupEdit":
      popupFunction = editProfile;
      break;
    case "popupAdd":
      popupFunction = addPlace;
      break;
    case "popupImage":
      popupFunction = fillPopupImage;
      break;
    default:
      console.log("Something gone wrong");
      break;
  }
  const popupTitle = content.querySelector(".popup__title");
  const popupInput1 = content.querySelector(".popup_input_1");
  const popupInput2 = content.querySelector(".popup_input_2");
  const submitButton = content.querySelector(".popup__submit");
  const contentImage = content.querySelector(".popup__image");
  const caption = content.querySelector(".popup__caption");
  const popupForm = content.querySelector(".popup__form");
  const closeButtons = content.querySelectorAll(".popup__close-button");
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

  // closeButton.addEventListener("click", () => {
  //   togglePopupVisibility(content);
  // });

  inputButtons.forEach(function (item) {
    // validation
    item.addEventListener("input", function () {
      const errorsLength = content.querySelectorAll(".popup__input:invalid").length;
      const submit = content.querySelector(".popup__submit");
      if (errorsLength > 0) {
        submit.disabled = true;
      } else if (errorsLength === 0) {
        submit.disabled = false;
      }
    });
  });

  content.classList.add(obj.class);
  page.append(content);
}
*/