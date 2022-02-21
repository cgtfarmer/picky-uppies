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
    this.target = null;
    this.accuracy = 1;
    this.criticalRate = 0;
    this.criticalDamage = 0;
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

    this.abilityTimer = 0;
    this.autoAttackAbility = new EnemyAutoAttackAbility(this);
    this.currentAbility = this.autoAttackAbility;
  }

  computeAbilityDamage(abilityName) {
    let ability = null;
    switch(abilityName) {
      case 'Enemy Auto Attack':
        ability = this.autoAttackAbility;
        break;
      default:
        console.log('ERROR: Invalid ability name');
    }

    if ((getRandomInt(1, 100) / 100) <= this.accuracy) {
      if ((getRandomInt(1, 100) / 100) <= this.criticalRate) {
        return (ability.damage + this.damage) * (1 + this.criticalDamage);
      } else {
        return (ability.damage + this.damage);
      }
    } else {
      return 0;
    }
  }

  advanceCastTime() {
    // console.log('[Enemy] [Advance Cast Time]');
    this.abilityTimer += (game.tickerIncrement / 1000);
    if (this.abilityTimer > this.currentAbility.castTime) {
      if (this.playerInDisengageRange()) {
        if (this.playerInRange()) {
          this.currentAbility.perform();
          this.startAutoAttack();
        } else {
          this.cancelCast();
        }
      } else {
        console.log('Player exceeded disengage range, cancelling enemy attack');
        this.attackingPlayer = false;
      }
    }
  }

  startAutoAttack() {
    console.log('[Player] [Start Auto Attack]');
    if (!this.target) {
      console.log('ERROR: Enemy has no target selected');
      return;
    }

    this.abilityTimer = 0;
    this.currentAbility = this.autoAttackAbility;
    // game.castBar.update(this.abilityTimer, this.currentAbility.castTime);
    // game.castBar.updateText(this.currentAbility.name);
    this.attackingPlayer = true;
  }

  cancelCast() {
    console.log('[Enemy] [Cancel Cast]');
    this.abilityTimer = 0;
    this.currentAbility = this.autoAttackAbility;
  }

  fire() {
    console.log('[Enemy] [Fire]');
    game.player.modifyHealth(this.damage * -1);
  }

  modifyHealth(value) {
    console.log('[Enemy] [Modify Health]');
    this.health += value;
    game.targetPortrait.healthBar.update(this.health, this.maxHealth);
  }

  die() {
    console.log('[Enemy] [Die]');
    const index = game.currentMap.enemies.findIndex(enemy => enemy == this);

    game.eventLog.addMessage(`You killed: ${this.name}. +${this.experience} XP`);

    game.player.addExperience(this.experience);

    this.dropLoot();

    if (game.player.enemyTarget == this) {
      game.player.cancelTarget();
    }

    game.currentMap.enemies.splice(index, 1);

    for (let projectile of game.currentMap.projectiles) {
      if (projectile.target == this) {
        projectile.target = null;
      }
    }

    game.currentMap.enemies.push(
      game.currentMap.generateRandomEnemy(this.name, this.level)
    );
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

  playerInRange(enemy) {
    // const msg = '[Enemy] [Player In Range]';
    return Game.pointInArea(
      [game.player.sprite.xAnchor, game.player.sprite.yAnchor],
      [(this.sprite.xAnchor - this.attackRange), (this.sprite.xAnchor + this.attackRange)],
      [(this.sprite.yAnchor - this.attackRange), (this.sprite.yAnchor + this.attackRange)]
    );
  }

  playerInAggroRange() {
    return Game.pointInArea(
      [game.player.sprite.xAnchor, game.player.sprite.yAnchor],
      [(this.sprite.xAnchor - this.aggroRange), (this.sprite.xAnchor + this.aggroRange)],
      [(this.sprite.yAnchor - this.aggroRange), (this.sprite.yAnchor + this.aggroRange)]
    );
  }

  playerInDisengageRange() {
    return Game.pointInArea(
      [game.player.sprite.xAnchor, game.player.sprite.yAnchor],
      [(this.sprite.xAnchor - this.disengageRange), (this.sprite.xAnchor + this.disengageRange)],
      [(this.sprite.yAnchor - this.disengageRange), (this.sprite.yAnchor + this.disengageRange)]
    );
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
    if (magnitude < (game.player.sprite.height + this.sprite.height)) {
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
    this.sprite.render();

    if (this == game.player.enemyTarget) {
      game.ctx.beginPath();
      game.ctx.lineWidth = 2;
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

