class Base {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.color = '#bbbbbb';
  }

  playerInRange() {
    return (
      this.x <= game.player.x &&
      game.player.x <= (this.x + this.width) &&
      this.y <= game.player.y &&
      game.player.y <= (this.y + this.height)
    )
  }

  render() {
    game.ctx.beginPath();
    game.ctx.lineWidth = 0.5;
    game.ctx.strokeStyle = '#000000';
    game.ctx.fillStyle = this.color;
    game.ctx.rect(this.x, this.y, this.width, this.height);
    game.ctx.fill();
    game.ctx.stroke();
  }
}

