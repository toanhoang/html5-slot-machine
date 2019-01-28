const cache = {};

export default class Symbol {
  constructor(name = Symbol.random()) {
    this.name = name;

    if (cache[name]) {
      this.img = cache[name].cloneNode();
    } else {
      this.img = new Image();
      this.img.src = require(`../assets/symbols/${name}.png`);
      cache[name] = this.img;
    }
  }

  static preload() {
    Symbol.symbols.forEach(symbol => new Symbol(symbol));
  }

  static get symbols() {
    return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  }

  static random() {
    return this.symbols[Math.floor(Math.random()*this.symbols.length)];
  }
}
