class ProgressBar {
  constructor(x, y, width, height, color, bgColor) {
    console.log('[Progress Bar] [Constructor]');
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.bgColor = bgColor;
    this.value = 100;
    this.maxValue = 100;
  }

  renderBackground() {
    game.ctx.beginPath();
    game.ctx.lineWidth = 0.5;
    game.ctx.strokeStyle = '#000000';
    game.ctx.fillStyle = this.bgColor;
    game.ctx.rect(this.x, this.y, this.width, this.height);
    game.ctx.fill();
    game.ctx.stroke();
  }

  renderForeground() {
    game.ctx.beginPath();
    game.ctx.lineWidth = 0.5;
    game.ctx.strokeStyle = '#000000';
    game.ctx.fillStyle = this.color;
    game.ctx.rect(
      this.x,
      this.y,
      this.width * (this.value / this.maxValue),
      this.height
    );
    game.ctx.fill();
    game.ctx.stroke();
  }

  renderText() {
    game.ctx.beginPath();
    game.ctx.lineWidth = 0.5;
    game.ctx.strokeStyle = '#000000';
    game.ctx.fillStyle = '#ffffff';
    game.ctx.font = '15px Georgia';
    game.ctx.textAlign = 'center';
    game.ctx.fillText(
      `${this.value} / ${this.maxValue}`,
      this.x + (this.width / 2),
      this.y + (this.height / 2) + 5
    );
    game.ctx.fill();
    game.ctx.stroke();
  }

  render() {
    this.renderBackground();
    this.renderForeground();
    this.renderText();
  }
}

