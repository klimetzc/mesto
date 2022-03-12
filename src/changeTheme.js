import pageElements from "./main.js";

pageElements.changeThemeButton.addEventListener("click", function (event) {
  changeTheme();
});

function changeTheme() {
  if (!pageElements.page.classList.contains("theme_dark")) {
    localStorage.setItem("lightTheme", "true");
  } else {
    localStorage.removeItem("lightTheme");
  }
  pageElements.page.classList.toggle("page_theme_light");
  pageElements.page.classList.toggle("theme_dark");
  pageElements.headerLogo.classList.toggle("header__logo_theme_dark");
  pageElements.editButton.classList.toggle("profile__edit-button_theme_dark");
  pageElements.addButton.classList.toggle("profile__add-button_theme_dark");
  pageElements.changeThemeButton.classList.toggle("theme-changer_theme_dark");
  const likeButtons = document.querySelectorAll(".element__like");
  likeButtons.forEach((item) => {
    item.classList.toggle("element__like_theme_dark");
  });
}

if (localStorage.hasOwnProperty("lightTheme")) {
  changeTheme();
}
