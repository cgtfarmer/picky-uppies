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

  die() {
    for (let i = 0; i < game.currentMap.enemies.length; i++) {
      // console.log(`${i}: ${this.currentMap.enemies[i].health} ${this.player.enemyTarget.health}`);
      if (game.currentMap.enemies[i] == game.player.enemyTarget) {
        this.dropLoot();
        game.currentMap.enemies.splice(i, 1);
        break;
      }
    }
  }

  generateRandomLoot() {
    console.log('[Enemy] [Generate Random Loot]');
    return new Loot(this.lootTable);
  }

  dropLoot() {
    console.log(`[Enemy] [Drop Loot] (${this.x}, ${this.y})`);
    this.loot.x = this.x;
    this.loot.y = this.y;
    console.log(`[Enemy] [Drop Loot] 2: (${this.loot.x}, ${this.loot.y})`);
    game.currentMap.loot.push(this.loot);
  }

  move() {
    this.#getTickVelocity();

    this.#truncateMapBoundaryVelocity();
  }

  #getTickVelocity() {
    const newDirection = getRandomInt(0, 15);
    if (newDirection == 0) {
      if (getRandomInt(1, 10) <= 4) {
        this.speedX = 0;
        this.speedY = 0;
      } else {
        this.speedX = getRandomInt(this.maxSpeedX * -1, this.maxSpeedX);
        this.speedY = getRandomInt(this.maxSpeedY * -1, this.maxSpeedY);
      }
    }
  }

  #truncateMapBoundaryVelocity() {
    // TODO: I should probably make a reference to the map this
    //       enemy belongs to, instead of assuming that map is the current map
    if (
      ((this.x + this.speedX) < 0) ||
      ((this.x + this.speedX) > (game.currentMap.width - this.width))
    ) {
      this.speedX = 0;
    } else {
      this.x += this.speedX;
    }

    if (
      ((this.y + this.speedY) < 0) ||
      ((this.y + this.speedY) > (game.currentMap.height - this.height))
    ) {
      this.speedY = 0;
    } else {
      this.y += this.speedY;
    }
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
      Player.targetHpUi.style.width = percentage;
      Player.targetHpUi.innerHTML = percentage;
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

