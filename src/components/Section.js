export default class Section {
    constructor({renderer }, containerSelector) {
      // this._items = items;
      this._renderer = renderer.bind(this);
      this._container = document.querySelector(containerSelector);
    }
  
    addItem(element, standartCard = true) {
      if (standartCard) {
        this._container.append(element);
      } else {
        this._container.prepend(element);
      }
    }
  
    clear() {
      this._container.innerHTML = '';
    }
  
    renderItems(items) {
      this.clear();
      items.forEach(element => {
        this._renderer(element);
      });
    }
  }