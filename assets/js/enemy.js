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
    this.level = 1;
    this.targetOffset = 10;
    this.lootTable = [
      { name: 'Credits', maxQuantity: 100 },
      { name: 'Uridium', maxQuantity: 5 },
      { name: 'Prometium', maxQuantity: 5 },
      { name: 'Endurium', maxQuantity: 3 },
      { name: 'Terbium', maxQuantity: 2 }
    ];
    this.loot = this.generateRandomLoot();
  }

  generateRandomLoot() {
    console.log('[Enemy] [Generate Random Loot]');
    return new Loot(this.lootTable);
  }

  dropLoot() {
    console.log(`[Enemy] [Drop Loot] (${this.x}, ${this.y})`);
    this.loot.x = this.x;
    this.loot.y = this.y;
    game.currentMap.loot.push(this.loot);
  }

  render() {
    game.ctx.beginPath();
    game.ctx.lineWidth = 0.5;
    game.ctx.strokeStyle = '#000000';
    game.ctx.fillStyle = this.color;
    game.ctx.rect(this.x, this.y, this.width, this.height);
    game.ctx.fill();
    game.ctx.stroke();

    if (this == game.player.enemyTarget) {
      const percentage = `${Math.round((this.health / this.maxHealth) * 100)}%`;
      targetHpUi.style.width = percentage;
      targetHpUi.innerHTML = percentage;
      game.ctx.beginPath();
      game.ctx.lineWidth = 2;
      game.ctx.strokeStyle = '#ffffff';
      game.ctx.rect(
        this.x - this.targetOffset,
        this.y - this.targetOffset,
        (this.width + (this.targetOffset * 2)),
        (this.height + (this.targetOffset * 2))
      );
      game.ctx.stroke();
    }
  }
}

