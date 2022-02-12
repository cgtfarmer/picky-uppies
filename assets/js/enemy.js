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
    this.demeanor = 'neutral'; // friendly, neutral, aggressive
    this.attackRange = 125;
    this.aggroRange = 150;
    this.disengageRange = 250;
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

  playerInRange(enemy) {
    // const msg = '[Enemy] [Player In Range]';
    if (
      ((this.sprite.xAnchor - this.attackRange) < game.player.sprite.xAnchor) &&
      (game.player.sprite.xAnchor < (this.sprite.xAnchor + this.attackRange)) &&
      ((this.sprite.yAnchor - this.attackRange) < game.player.sprite.yAnchor) &&
      (game.player.sprite.yAnchor < (this.sprite.yAnchor + this.attackRange))
    ) {
      // console.log(`${msg} true`);
      return true;
    } else {
      // console.log(`${msg} false`);
      return false;
    }
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
    const index = game.currentMap.enemies.findIndex(enemy => enemy == this);
    // for (let i = 0; i < game.currentMap.enemies.length; i++) {
      // console.log(`${i}: ${this.currentMap.enemies[i].health} ${this.player.enemyTarget.health}`);
      //if (game.currentMap.enemies[i] == game.player.enemyTarget) {
    game.eventLog.addMessage(`You killed: ${this.name}. +${this.experience} XP`);

    game.player.addExperience(this.experience);

    this.dropLoot();

    if (game.player.enemyTarget == this) {
      game.player.cancelTarget();
    }

    game.currentMap.enemies.splice(index, 1);

    for (let projectile of game.currentMap.projectiles) {
    }

    game.currentMap.enemies.push(
      game.currentMap.generateRandomEnemy(
        this.name,
        this.level
      )
    );

    // break;
      // }
    // }
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

    this.sprite.updatePosition(
      this.sprite.x + this.speedX,
      this.sprite.y + this.speedY,
    );
  }

  #getTickVelocity() {
    if (this.attackingPlayer) {
      this.#pursuePlayer();
    } else {
      this.#performNormalMotion();
    }
  }

  playerInAggroRange() {
    if (
      ((this.sprite.xAnchor - this.aggroRange) < game.player.sprite.xAnchor) &&
      (game.player.sprite.xAnchor < (this.sprite.xAnchor + this.aggroRange)) &&
      ((this.sprite.yAnchor - this.aggroRange) < game.player.sprite.yAnchor) &&
      (game.player.sprite.yAnchor < (this.sprite.yAnchor + this.aggroRange))
    ) {
      // console.log(`${msg} true`);
      return true;
    } else {
      // console.log(`${msg} false`);
      return false;
    }
  }

  playerInDisengageRange() {
    if (
      ((this.sprite.xAnchor - this.disengageRange) < game.player.sprite.xAnchor) &&
      (game.player.sprite.xAnchor < (this.sprite.xAnchor + this.disengageRange)) &&
      ((this.sprite.yAnchor - this.disengageRange) < game.player.sprite.yAnchor) &&
      (game.player.sprite.yAnchor < (this.sprite.yAnchor + this.disengageRange))
    ) {
      // console.log(`${msg} true`);
      return true;
    } else {
      // console.log(`${msg} false`);
      return false;
    }
  }

  #performNormalMotion() {
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

  #pursuePlayer() {
    const xDelta = game.player.sprite.xAnchor - this.sprite.xAnchor;
    const yDelta = game.player.sprite.yAnchor - this.sprite.yAnchor;

    // Get vector magnitude (hypotenuse) w/ pythagorean theorem
    const magnitude = Math.sqrt(
      Math.pow(xDelta, 2) + Math.pow(yDelta, 2)
    );

    // Stop advancing upon reaching player border
    if (magnitude < (this.sprite.height + 10)) {
      this.speedX = 0;
      this.speedY = 0;
      return;
    }

    // If magnitude is within boundary, accept final speeds
    if (magnitude <= this.maxSpeedX) {
      this.speedX = xDelta;
      this.speedY = yDelta;
      return
    }

    // Find modifier to scale down to maxSpeed w/ (maxSpeed/hyp)
    const scalingModifer = this.maxSpeedX / magnitude;

    // Apply modifier to x/y sides of triangle
    this.speedX = xDelta * scalingModifer;
    this.speedY = yDelta * scalingModifer;

    // if (game.player.sprite.xAnchor < this.sprite.xAnchor) {
    //   this.speedX = (this.maxSpeedX * -1);
    // } else if (game.player.sprite.xAnchor > this.sprite.xAnchor) {
    //   this.speedX = this.maxSpeedX;
    // } else {
    //   this.speedX = 0;
    // }

    // if (game.player.sprite.yAnchor < this.sprite.yAnchor) {
    //   this.speedY = (this.maxSpeedY * -1);
    // } else if (game.player.sprite.yAnchor > this.sprite.yAnchor) {
    //   this.speedY = this.maxSpeedY;
    // } else {
    //   this.speedY = 0;
    // }
  }

  #truncateMapBoundaryVelocity() {
    if (
      ((this.sprite.x + this.speedX) < 0) ||
      ((this.sprite.x + this.sprite.width + this.speedX) > game.currentMap.width)
    ) {
      this.speedX = 0;
    }

    if (
      ((this.sprite.y + this.speedY) < 0) ||
      ((this.sprite.y + this.sprite.height + this.speedY) > game.currentMap.height)
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
      // game.player.autoAttackAbility.range + game.player.attackRange
      if (game.player.enemyInAutoAttackRange(this)) {
        game.ctx.strokeStyle = '#00ff00';
      } else {
        game.ctx.strokeStyle = '#ffffff';
      }
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

