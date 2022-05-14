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

  addItem(item, isNew) {
    if (isNew) {
      this._cardsContainer.prepend(this._renderer(item, "#element", 0));
    } else {
      this._cardsContainer.append(this._renderer(item, "#element", item.likes.length, item._id));
    }
  }
}
