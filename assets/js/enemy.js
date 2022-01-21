class Enemy {
  constructor(x, y) {
    console.log('[Enemy] [Constructor]');
    this.width = 40;
    this.height = 40;
    this.x = x;
    this.y = y;
    this.maxSpeedX = 3;
    this.maxSpeedY = 3;
    this.speedX = getRandomInt(this.maxSpeedX * -1, this.maxSpeedX);
    this.speedY = getRandomInt(this.maxSpeedY * -1, this.maxSpeedY);
    this.maxHealth = 100;
    this.health = 100;
    this.dps = 5;
    this.attackingPlayer = false;
    this.experience = 15;
    this.color = 'red';
    this.targetOffset = 10;
  }

  render() {
    game.ctx.beginPath();
    game.ctx.fillStyle = this.color;
    game.ctx.rect(this.x, this.y, this.width, this.height);
    game.ctx.fill();
    game.ctx.stroke();

    if (this == game.player.enemyTarget) {
      const percentage = `${Math.round((this.health / this.maxHealth) * 100)}%`;
      targetHpUi.style.width = percentage;
      targetHpUi.innerHTML = percentage;
      game.ctx.beginPath();
      // game.ctx.fillStyle = this.color;
      game.ctx.strokeStyle = '#ffffff';
      game.ctx.rect(
        this.x - this.targetOffset,
        this.y - this.targetOffset,
        (this.width + (this.targetOffset * 2)),
        (this.height + (this.targetOffset * 2))
      );
      game.ctx.stroke();
      game.ctx.strokeStyle = '#000000';
    }
  }
}

