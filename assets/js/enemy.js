class Enemy {
  constructor(x, y) {
    console.log('[Enemy] [Constructor]');
    this.maxSpeedX = 3;
    this.maxSpeedY = 3;
    this.name = 'Struener';
    this.speedX = getRandomInt(this.maxSpeedX * -1, this.maxSpeedX);
    this.speedY = getRandomInt(this.maxSpeedY * -1, this.maxSpeedY);
    this.maxHealth = 100;
    this.health = 100;
    this.damage = 3;
    this.fireRate = 1.0;
    this.fireTicker = 0;
    this.attackingPlayer = false;
    this.experience = 15; // 15
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

    this.sprite = new Rectangle(
      x, y, 40, 40, '#ff0000'
    );
  }

  fire() {
    console.log('[Enemy] [Fire]');
    game.player.modifyHealth(this.damage * -1);
    // game.player.health -= this.damage;
  }

  modifyHealth(value) {
    console.log('[Enemy] [Modify Health]');
    this.health += value;
    game.targetPortrait.healthBar.update(this.health, this.maxHealth);

    // Player.targetCardDamageUi.innerHTML = value;
    // window.setTimeout(() => {
    //   Player.targetCardDamageUi.innerHTML = '';
    // }, 500);
  }

  die() {
    console.log('[Enemy] [Die]');
    for (let i = 0; i < game.currentMap.enemies.length; i++) {
      // console.log(`${i}: ${this.currentMap.enemies[i].health} ${this.player.enemyTarget.health}`);
      if (game.currentMap.enemies[i] == game.player.enemyTarget) {
        game.eventLog.addMessage(`You killed: ${game.player.enemyTarget.name}. +${game.player.enemyTarget.experience} XP`);
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
    console.log(`[Enemy] [Drop Loot] (${this.sprite.x}, ${this.sprite.y})`);;
    this.loot.spawn(this.sprite.x, this.sprite.y);
    game.currentMap.loot.push(this.loot);
  }

  move() {
    this.#getTickVelocity();

    this.#truncateMapBoundaryVelocity();

    // this.sprite.x += this.speedX;
    // this.sprite.y += this.speedY;

    this.sprite.updatePosition(
      this.sprite.x + this.speedX,
      this.sprite.y + this.speedY,
    );
  }

  #getTickVelocity() {
    if (game.player.attackingEnemy && (game.player.enemyTarget == this)) {
      if (game.player.sprite.x < this.sprite.x) {
        this.speedX = (this.maxSpeedX * -1);
      } else if (game.player.sprite.x > this.sprite.x) {
        this.speedX = this.maxSpeedX;
      } else {
        this.speedX = 0;
      }

      if (game.player.sprite.y < this.sprite.y) {
        this.speedY = (this.maxSpeedY * -1);
      } else if (game.player.sprite.y > this.sprite.y) {
        this.speedY = this.maxSpeedY;
      } else {
        this.speedY = 0;
      }
    } else {
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
  }

  #truncateMapBoundaryVelocity() {
    // TODO: I should probably make a reference to the map this
    //       enemy belongs to, instead of assuming that map is the current map
    if (
      ((this.sprite.x + this.speedX) < 0) ||
      ((this.sprite.x + this.speedX) > (game.currentMap.width - this.sprite.width))
    ) {
      this.speedX = 0;
    }

    if (
      ((this.sprite.y + this.speedY) < 0) ||
      ((this.sprite.y + this.speedY) > (game.currentMap.height - this.sprite.height))
    ) {
      this.speedY = 0;
    }
  }

  render() {
    // game.ctx.beginPath();
    // game.ctx.lineWidth = 0.5;
    // game.ctx.strokeStyle = '#000000';
    // game.ctx.fillStyle = this.color;
    // game.ctx.rect(this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height);
    // game.ctx.fill();
    // game.ctx.stroke();
    this.sprite.render();

    if (this == game.player.enemyTarget) {
      // const percentage = `${Math.round((this.health / this.maxHealth) * 100)}%`;
      // Player.targetHpUi.style.width = percentage;
      // Player.targetHpUi.innerHTML = percentage;
      game.ctx.beginPath();
      game.ctx.lineWidth = 2;
      game.ctx.strokeStyle = '#ffffff';
      game.ctx.rect(
        this.sprite.x - this.targetOffset,
        this.sprite.y - this.targetOffset,
        (this.sprite.width + (this.targetOffset * 2)),
        (this.sprite.height + (this.targetOffset * 2))
      );
      game.ctx.stroke();
    }
  }
}

