class Resource {
  constructor(x, y, color, sellValue) {
    // this.x = x;
    // this.y = y;
    // this.radius = 10;
    // this.color = color;
    this.sellValue = sellValue;
    this.sprite = new Circle(
      x, y, 10, color
    );
  }

  render() {
    this.sprite.render();

    // game.ctx.beginPath();
    // game.ctx.lineWidth = 0.5;
    // game.ctx.strokeStyle = '#000000';
    // game.ctx.fillStyle = this.color;
    // game.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    // game.ctx.fill();
    // game.ctx.stroke();
  }

  toString() {
    return `${this.constructor.name}: 1`;
  }
}

class Prometium extends Resource {
  constructor(x, y) {
    super(x, y, 'red', 10);
  }
}

class Endurium extends Resource {
  constructor(x, y) {
    super(x, y, 'blue', 15);
  }
}

class Terbium extends Resource {
  constructor(x, y) {
    super(x, y, 'yellow', 20);
  }
}

