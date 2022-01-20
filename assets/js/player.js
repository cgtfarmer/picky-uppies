class Player {
  constructor() {
    this.width = 50;
    this.height = 50;
    this.x = 50;
    this.y = 50;
    this.maxSpeedX = 10;
    this.maxSpeedY = 10;
    this.speedX = 0;
    this.speedY = 0;
    this.health = 100;
    this.dps = 10;
    this.enemyTarget = null;
    this.inventory = new Inventory();
  }

  targetNearestEnemy() {
  }

  attackEnemyTarget() {
  }

  collect() {
    console.log('[Player] [Collect]');
    for (let i = 0; i < currentMap.bonusBoxes.length; i++) {
      const bonusBox = currentMap.bonusBoxes[i];
      if (this.collectibleInRange(bonusBox)) {
        console.log(bonusBox);
        for (let reward of bonusBox.rewards) {
          console.log(reward);
          if (reward['name'] == 'Credits') {
            this.inventory.addCredits(reward['quantity']);
          } else if (reward['name'] == 'Uridium') {
            this.inventory.addUridium(reward['quantity']);
          } else if (reward['name'] == 'Ammunition') {
            this.inventory.addAmmunition(reward['quantity']);
          }
        }

        return { 'type': 'bonusBox', 'index': i };
      }
    }

    if (this.inventory.size >= this.inventory.capacity) {
      console.log('ERROR: Inventory is full');
      return -1;
    }

    for (let i = 0; i < currentMap.resources.length; i++) {
      const resource = currentMap.resources[i];
      if (this.collectibleInRange(resource)) {
        this.inventory.addResource(resource.constructor.name, 1)
        return { 'type': 'resource', 'index': i };
      }
    }

    return -1;
  }

  collectResource() {
    if (this.inventory.size >= this.inventory.capacity) {
      console.log('ERROR: Inventory is full');
      return -1;
    }

    for (let i = 0; i < currentMap.resources.length; i++) {
      const resource = currentMap.resources[i];
      if (this.collectibleInRange(resource)) {
        this.inventory.addResource(resource.constructor.name, 1)
        return i;
      }
    }
  }

  collectibleInRange(collectible) {
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
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
    ctx.stroke();
  }
}

