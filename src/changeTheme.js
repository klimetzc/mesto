import * as pE from "./pageElements.js";

pE.changeThemeButton.addEventListener("click", function (event) {
  changeTheme();
});

function changeTheme() {
  if (!pE.page.classList.contains("theme_light")) {
    localStorage.setItem("lightTheme", "true");
  } else {
    localStorage.removeItem("lightTheme");
  }
  pE.page.classList.toggle("page_theme_light");
  pE.page.classList.toggle("theme_light");
  pE.headerLogo.classList.toggle("header__logo_theme_light");
  pE.editButton.classList.toggle("profile__edit-button_theme_light");
  pE.addButton.classList.toggle("profile__add-button_theme_light");
  pE.changeThemeButton.classList.toggle("theme-changer_theme_light");
  const likeButtons = document.querySelectorAll(".element__like");
  likeButtons.forEach((item) => {
    item.classList.toggle("element__like_theme_light");
  });
}

if (localStorage.hasOwnProperty("lightTheme")) {
  changeTheme();
}
