import * as pageElements from "./pageElements.js";

pageElements.buttonChangeTheme.addEventListener("click", function (event) {
  changeTheme();
});

function changeTheme() {
  if (!pageElements.page.classList.contains("theme_light")) {
    localStorage.setItem("lightTheme", "true");
  } else {
    localStorage.removeItem("lightTheme");
  }
  pageElements.page.classList.toggle("page_theme_light");
  pageElements.page.classList.toggle("theme_light");
  pageElements.headerLogo.classList.toggle("header__logo_theme_light");
  pageElements.buttonEdit.classList.toggle("profile__edit-button_theme_light");
  pageElements.buttonAdd.classList.toggle("profile__add-button_theme_light");
  pageElements.buttonChangeTheme.classList.toggle("theme-changer_theme_light");
  const likeButtons = document.querySelectorAll(".element__like");
  likeButtons.forEach((item) => {
    item.classList.toggle("element__like_theme_light");
  });
}

if (localStorage.hasOwnProperty("lightTheme")) {
  changeTheme();
}
