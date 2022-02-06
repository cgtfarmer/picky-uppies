class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.xAnchor = x;
    this.yAnchor = y;
    this.radius = radius;
    this.fillColor = color;
    this.lineWidth = 0.5;
    this.strokeColor = '#000000';
  }

  render() {
    game.ctx.beginPath();
    game.ctx.lineWidth = this.lineWidth;
    game.ctx.strokeStyle = this.strokeColor;
    game.ctx.fillStyle = this.fillColor;
    game.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    game.ctx.fill();
    game.ctx.stroke();
  }
}

