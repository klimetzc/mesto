export default class Section {
  constructor({ items, renderer }, selector) {
    this._cardsContainer = document.querySelector(`${selector}`);
    this._items = items;
    this._renderer = renderer; // renderCard form index.js
  }

  renderItems() {
    this._items.forEach((card) => {
      this._addItem(this._renderer(card, "#element"));
    });
  }

  _addItem(item) {
    this._cardsContainer.append(item);
  }
}
