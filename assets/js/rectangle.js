class Rectangle {
  constructor(x, y, width, height, color) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.xAnchor = (x + (this.width / 2));
    this.yAnchor = (y + (this.height / 2));
    this.lineWidth = 0.5;
    this.strokeColor = '#000000';
    this.fillColor = color;
    this.fill = true;
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
    this.xAnchor = (x + (this.width / 2));
    this.yAnchor = (y + (this.height / 2));
  }

  render() {
    game.ctx.beginPath();
    game.ctx.lineWidth = this.lineWidth;
    game.ctx.strokeStyle = this.strokeColor;
    game.ctx.fillStyle = this.fillColor;
    game.ctx.rect(this.x, this.y, this.width, this.height);
    if (this.fill) {
      game.ctx.fill();
    }
    game.ctx.stroke();
  }
}

