export class Section {
  constructor({ data, renderer }, containerSelector) {
    this.renderedItems = data;
    this.renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this.clear();

    this.renderedItems.forEach(item => {
      this.renderer(item);
    });
  }
}