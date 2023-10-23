class Text {
  constructor(x, y, content, size, color, alignment) {
    this.x = x;
    this.y = y;
    this.content = content;
    this.fontSize = size;
    this.fontFamily = 'Georgia';
    this.lineWidth = 0.5;
    this.strokeColor = '#000000';
    this.fillColor = color;
    this.alignment = alignment;
  }

  render() {
    game.ctx.beginPath();
    game.ctx.lineWidth = this.lineWidth;
    game.ctx.strokeStyle = this.strokeColor;
    game.ctx.fillStyle = this.fillColor;
    game.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    game.ctx.textAlign = this.alignment;
    game.ctx.fillText(this.content, this.x, this.y);
    game.ctx.fill();
    game.ctx.stroke();
  }
}

