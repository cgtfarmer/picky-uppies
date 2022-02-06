class Base {
  constructor(x, y) {
    // this.x = x;
    // this.y = y;
    // this.width = 100;
    // this.height = 100;
    // this.color = '#bbbbbb';
    this.sprite = new Rectangle(x, y, 100, 100, '#bbbbbb');
  }

  playerInRange() {
    return (
      this.sprite.x <= game.player.sprite.x &&
      game.player.sprite.x <= (this.sprite.x + this.sprite.width) &&
      this.sprite.y <= game.player.sprite.y &&
      game.player.y <= (this.sprite.y + this.sprite.height)
    )
  }

  render() {
    this.sprite.render();
    // game.ctx.beginPath();
    // game.ctx.lineWidth = 0.5;
    // game.ctx.strokeStyle = '#000000';
    // game.ctx.fillStyle = this.color;
    // game.ctx.rect(this.x, this.y, this.width, this.height);
    // game.ctx.fill();
    // game.ctx.stroke();
  }
}

