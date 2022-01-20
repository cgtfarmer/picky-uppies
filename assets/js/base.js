class Base {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.color = 'gray';
  }

  render() {
    game.ctx.beginPath();
    game.ctx.fillStyle = this.color;
    game.ctx.rect(this.x, this.y, this.width, this.height);
    game.ctx.fill();
    game.ctx.stroke();
  }
}

