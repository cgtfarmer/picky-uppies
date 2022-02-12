class ExperienceBar extends ProgressBar {
  constructor(x, y, width, height) {
    console.log('[Experience Bar] [Constructor]');
    super(x, y, width, height, '#00c00090', '#55555590');
    this.level = 0;
  }

  update(level, value, maxValue) {
    console.log('[Experience Bar] [Update]');
    this.level = level;
    this.value = value;
    this.maxValue = maxValue;
    this.foreground.width = this.width * (this.value / this.maxValue),
    this.text.content = `
      Level ${this.level}  [ ${this.value} / ${this.maxValue} ]
    `;
  }

  // renderText() {
  //   game.ctx.beginPath();
  //   game.ctx.lineWidth = 0.5;
  //   game.ctx.strokeStyle = '#000000';
  //   game.ctx.fillStyle = '#ffffff';
  //   game.ctx.font = '15px Georgia';
  //   game.ctx.textAlign = 'center';
  //   game.ctx.fillText(
  //     `Level ${this.level}  [ ${this.value} / ${this.maxValue} ]`,
  //     this.x + (this.width / 2),
  //     this.y + (this.height / 2) + 5
  //   );
  //   game.ctx.fill();
  //   game.ctx.stroke();
  // }
}

