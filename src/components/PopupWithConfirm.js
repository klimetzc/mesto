import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, confirmHandler) {
    super(popupSelector);
    this._confirm = confirmHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (event) => {
      event.preventDefault();

      this._confirm(this.cardID, this.currentCard);
    });
  }

  open = (id, card) => {
    this.cardID = id;
    this.currentCard = card;
    super.open();
  };
}
