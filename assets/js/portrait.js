class Portrait {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.backgroundColor = '#cccccc90';
    this.width = 300;
    this.height = 65;
    this.offset = 5;
    this.name = '';
    this.healthBar = new HealthBar(
      this.x + this.offset,
      this.y + (this.height - 25 - this.offset),
      this.width - (this.offset * 2),
      25
    );
  }

  renderName() {
    game.ctx.beginPath();
    game.ctx.lineWidth = 0.5;
    game.ctx.strokeStyle = '#000000';
    game.ctx.fillStyle = '#000000';
    game.ctx.font = '25px Georgia';
    game.ctx.textAlign = 'center';
    game.ctx.fillText(
      this.name,
      this.x + (this.width / 2),
      this.y + 25
    );
    game.ctx.fill();
    game.ctx.stroke();
  }

  renderImg() {
    game.ctx.beginPath();
    game.ctx.lineWidth = 0.5;
    game.ctx.strokeStyle = '#000000';
    game.ctx.fillStyle = '#444444';
    game.ctx.rect(
      this.x + this.offset,
      this.y + this.offset,
      this.height - this.offset,
      this.height - (this.offset * 2)
    );
    game.ctx.fill();
    game.ctx.stroke();
  }

  render() {
    game.ctx.beginPath();
    game.ctx.lineWidth = 0.5;
    game.ctx.strokeStyle = '#000000';
    game.ctx.fillStyle = this.backgroundColor;
    game.ctx.rect(this.x, this.y, this.width, this.height);
    game.ctx.fill();
    game.ctx.stroke();

    // renderImg();

    this.healthBar.render();

    this.renderName();
  }
}

