export default class ThemeChanger {
  constructor(pageElements) {
    this.page = pageElements.page;
    this.headerLogo = pageElements.headerLogo;
    this.buttonEdit = pageElements.buttonEdit;
    this.buttonAdd = pageElements.buttonAdd;
    this.buttonChangeTheme = pageElements.buttonChangeTheme;
    this._setListeners.bind(this);
  }

  changeTheme() {
    if (!this.page.classList.contains("theme_light")) {
      localStorage.setItem("lightTheme", "true");
    } else {
      localStorage.removeItem("lightTheme");
    }
    this.page.classList.toggle("page_theme_light");
    this.page.classList.toggle("theme_light");
    this.headerLogo.classList.toggle("header__logo_theme_light");
    this.buttonEdit.classList.toggle("profile__edit-button_theme_light");
    this.buttonAdd.classList.toggle("profile__add-button_theme_light");
    this.buttonChangeTheme.classList.toggle("theme-changer_theme_light");
    const likeButtons = document.querySelectorAll(".element__like");
    likeButtons.forEach((item) => {
      item.classList.toggle("element__like_theme_light");
    });
  }

  _setListeners() {
    this.buttonChangeTheme.addEventListener("click", () => {
      this.changeTheme();
    });
  }

  enableThemeChanger() {
    this._setListeners();
    if (localStorage.hasOwnProperty("lightTheme")) {
      this.changeTheme();
    }
  }
}
