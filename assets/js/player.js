class Player {
  constructor() {
    console.log('[Player] [Constructor]');
    this.width = 50;
    this.height = 50;
    this.x = 125;
    this.y = 125;
    this.maxSpeedX = 10;
    this.maxSpeedY = 10;
    this.speedX = 0;
    this.speedY = 0;
    this.health = 100;
    this.dps = 10;
    this.attackRange = 125;
    this.enemyTarget = null;
    this.attackingEnemy = false;
    this.experience = 0;
    this.inventory = new Inventory();
  }

  targetNearestEnemy() {
    console.log('[Player] [Target Nearest Enemy]');
    for (let i = 0; i < game.currentMap.enemies.length; i++) {
      const enemy = game.currentMap.enemies[i];
      if (this.enemyInRange(enemy) && enemy != this.enemyTarget) {
        this.enemyTarget = enemy;
        return true;
      }
    }

    return false;
  }

  attackEnemyTarget() {
    console.log('[Player] [Attack Enemy Target]');
    this.attackingEnemy = true;
  }

  collect() {
    console.log('[Player] [Collect]');
    for (let i = 0; i < game.currentMap.bonusBoxes.length; i++) {
      const bonusBox = game.currentMap.bonusBoxes[i];
      if (this.collectibleInRange(bonusBox)) {
        this.collectBonusBox(bonusBox);
        return { 'type': 'bonusBox', 'index': i };
      }
    }

    if (this.inventory.size >= this.inventory.capacity) {
      console.log('ERROR: Inventory is full');
      return -1;
    }

    for (let i = 0; i < game.currentMap.resources.length; i++) {
      const resource = game.currentMap.resources[i];
      if (this.collectibleInRange(resource)) {
        this.inventory.addResource(resource.constructor.name, 1)
        return { 'type': 'resource', 'index': i };
      }
    }

    return -1;
  }

  collectBonusBox(bonusBox) {
    console.log('[Player] [Collect] [Collect Bonus Box]');
    for (let reward of bonusBox.rewards) {
      // console.log(reward);
      if (reward['name'] == 'Credits') {
        this.inventory.addCredits(reward['quantity']);
      } else if (reward['name'] == 'Uridium') {
        this.inventory.addUridium(reward['quantity']);
      } else if (reward['name'] == 'Ammunition') {
        this.inventory.addAmmunition(reward['quantity']);
      }
    }
  }

  collectResource() {
    console.log('[Player] [Collect Resource]');
    if (this.inventory.size >= this.inventory.capacity) {
      console.log('ERROR: Inventory is full');
      return -1;
    }

    for (let i = 0; i < game.currentMap.resources.length; i++) {
      const resource = game.currentMap.resources[i];
      if (this.collectibleInRange(resource)) {
        this.inventory.addResource(resource.constructor.name, 1)
        return i;
      }
    }
  }

  enemyInRange(enemy) {
    const msg = '[Player] [Enemy In Range]';
    if (
      ((this.x - this.attackRange) < enemy.x) &&
      ((enemy.x + enemy.width) < (this.x + this.width + this.attackRange)) &&
      ((this.y - this.attackRange) < enemy.y) &&
      ((enemy.y + enemy.height) < (this.y + this.height + this.attackRange))
    ) {
      console.log(`${msg} true`);
      return true;
    } else {
      console.log(`${msg} false`);
      return false;
    }
  }

  collectibleInRange(collectible) {
    console.log('[Player] [Collectible In Range]');
    if (
      (this.x < collectible.x) &&
      (collectible.x < (this.x + this.width)) &&
      (this.y < collectible.y) &&
      (collectible.y < (this.y + this.height))
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    game.ctx.beginPath();
    game.ctx.fillStyle = '#ffffff';
    game.ctx.rect(this.x, this.y, this.width, this.height);
    game.ctx.fill();
    game.ctx.stroke();
  }
}

