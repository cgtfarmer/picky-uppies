class Rectangle {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.lineWidth = 0.5;
    this.strokeColor = '#000000';
    this.fillColor = color;
  }

  render() {
    game.ctx.beginPath();
    game.ctx.lineWidth = this.lineWidth;
    game.ctx.strokeStyle = this.strokeColor;
    game.ctx.fillStyle = this.fillColor;
    game.ctx.rect(this.x, this.y, this.width, this.height);
    game.ctx.fill();
    game.ctx.stroke();
  }
}

