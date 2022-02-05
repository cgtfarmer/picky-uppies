class ExperienceBar extends ProgressBar {
  constructor(x, y, width, height) {
    console.log('[Experience Bar] [Constructor]');
    super(x, y, width, height, '#00c000', '#555555');
    this.level = 0;
  }

  renderText() {
    game.ctx.beginPath();
    game.ctx.lineWidth = 0.5;
    game.ctx.strokeStyle = '#000000';
    game.ctx.fillStyle = '#ffffff';
    game.ctx.font = '15px Georgia';
    game.ctx.textAlign = 'center';
    game.ctx.fillText(
      `Level ${this.level}  [ ${this.value} / ${this.maxValue} ]`,
      this.x + (this.width / 2),
      this.y + (this.height / 2) + 5
    );
    game.ctx.fill();
    game.ctx.stroke();
  }
}

