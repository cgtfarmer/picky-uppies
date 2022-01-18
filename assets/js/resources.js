class Resource {
  constructor(name, color, x, y) {
    this.name = name;
    this.color = color;
    this.x = x;
    this.y = y;
  }

  toString(x, y) {
    return `${this.name}(${this.x}, ${this.y})`;
  }
}

class Prometium extends Resource {
  constructor(x, y) {
    super('Prometium', 'red', x, y);
    this.value = 10;
    this.radius = 10;
  }
}

class Endurium extends Resource {
  constructor(x, y) {
    super('Endurium', 'blue', x, y);
    this.value = 15;
    this.radius = 10;
  }
}

class Terbium extends Resource {
  constructor(x, y) {
    super('Terbium', 'yellow', x, y);
    this.value = 20;
    this.radius = 10;
  }
}

