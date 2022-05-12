export default class Section {
  constructor({ items, renderer }, selector) {
    this._cardsContainer = document.querySelector(`${selector}`);
    this._items = items;
    this._renderer = renderer; // renderCard form index.js
  }

  renderItems() {
    this._items.forEach((card) => {
      this.addItem(card, false);
    });
  }

  addItem(item, isPrepend = true) {
    if (isPrepend) {
      this._cardsContainer.prepend(this._renderer(item, "#element"));
    } else {
      this._cardsContainer.append(this._renderer(item, "#element"));
    }
  }
}
