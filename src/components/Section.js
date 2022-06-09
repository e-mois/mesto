export class Section {
  constructor({ data, renderer }, containerSelector) {
    this.renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item) {
    const card = this._renderer(item);
    this._container.prepend(card);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this.clear();

    this.renderedItems.forEach(item => {
      this.addItem(item);
    });
  }
}