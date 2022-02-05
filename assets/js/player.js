class Player {
  static targetUi = document.querySelector('#target');
  static targetCardLvlUi = document.querySelector('#target-card-lvl');
  static targetHpUi = document.querySelector('#target-hp');
  static targetCardDamageUi = document.querySelector('#target-card-damage');
  static playerCardDamageUi = document.querySelector('#player-card-damage');
  static levelUi = document.querySelector('#player-level');
  static cardHpUi = document.querySelector('#player-card-hp');
  static hpUi = document.querySelector('#player-hp');
  static maxHpUi = document.querySelector('#player-max-hp');
  static dpsUi = document.querySelector('#player-dps');
  static damageUi = document.querySelector('#player-damage');
  static accuracyUi = document.querySelector('#player-accuracy');
  static fireRateUi = document.querySelector('#player-fire-rate');
  static attackRangeUi = document.querySelector('#player-attack-range');
  static criticalRateUi = document.querySelector('#player-critical-rate');
  static criticalDamageUi = document.querySelector('#player-critical-damage');
  static speedUi = document.querySelector('#player-speed');
  static playerCardLvlUi = document.querySelector('#player-card-lvl');
  static playerTotalExperienceUi = document.querySelector('#player-total-experience');
  static playerCurrentExperienceUi = document.querySelector('#player-current-experience');
  static playerLevelExperienceUi = document.querySelector('#player-level-experience');
  static experienceUi = document.querySelector('#experience');
  static experienceTable = [
    0, 100, 175, 300, 500, 800, 1300, 1750, 3000, 5000, 0
  ]

  constructor() {
    console.log('[Player] [Constructor]');
    this.width = 50;
    this.height = 50;
    this.x = 125;
    this.y = 125;
    this.xAnchor = this.x + (this.width / 2);
    this.yAnchor = this.y + (this.height / 2);
    this.maxSpeedX = 10; // 10, 50
    this.maxSpeedY = 10; // 10, 50
    this.speedX = 0;
    this.speedY = 0;
    this.health = 100;
    this.maxHealth = 100;
    this.fireRate = 1.0;
    this.damage = 10.0; // 10.0, 50.0
    this.accuracy = 0.7; // 0.7, 1.7
    this.criticalRate = 0.1;
    this.criticalDamage = 0.5;
    this.dps = null;
    this.attackRange = 150;
    this.enemyTarget = null;
    this.attackingEnemy = false;
    this.fireTicker = 0;
    this.level = 1;
    this.totalExperience = 10;
    this.experience = 10;
    this.inventory = new Inventory();
    this.updateDps();
    this.updateExperienceUi();
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.xAnchor = this.x + (this.width / 2);
    this.yAnchor = this.y + (this.height / 2);
  }

  updateDps() {
    this.dps = Math.round(
      this.damage * this.fireRate * (1.0 + this.criticalRate) * this.accuracy * 100
    ) / 100;
  }

  addExperience() {
    this.totalExperience += this.enemyTarget.experience;
    this.experience += this.enemyTarget.experience;

    if (this.experience >= Player.experienceTable[this.level]) {
      this.experience -= Player.experienceTable[this.level];
      this.level += 1;
      new SuccessMessage(`You are now level ${this.level}!`);
      this.maxHealth += 10;
      this.health = this.maxHealth;
      this.damage += 1;
      this.criticalRate += 0.025;
      this.criticalDamage += 0.05;
      this.fireRate -= 0.5;
    }

    this.updateExperienceUi();
  }

  updateExperienceUi() {
    const percentage = `${Math.round((this.experience / Player.experienceTable[this.level]) * 100)}%`;
    Player.experienceUi.style.width = percentage;
    Player.experienceUi.innerHTML = percentage;

    game.experienceBar.maxValue = Player.experienceTable[this.level];
    game.experienceBar.value = this.experience;
    game.experienceBar.level = this.level;

    Player.playerCardLvlUi.innerHTML = this.level;
  }

  fire() {
    console.log('[Player] [Fire]');
    this.inventory.removeAmmunition(10);
    const fireDamage = this.#computeFireDamage();
    this.enemyTarget.modifyHealth(fireDamage * -1);
  }

  #computeFireDamage() {
    if ((getRandomInt(1, 100) / 100) <= this.accuracy) {
      if ((getRandomInt(1, 100) / 100) <= this.criticalRate) {
        return (this.damage * (1 + this.criticalDamage));
      } else {
        return this.damage;
      }
    } else {
      return 0;
    }
  }

  targetNearestEnemy() {
    console.log('[Player] [Target Nearest Enemy]');
    for (let i = 0; i < game.currentMap.enemies.length; i++) {
      const enemy = game.currentMap.enemies[i];
      if (this.enemyInRange(enemy) && enemy != this.enemyTarget) {
        this.enemyTarget = enemy;
        Player.targetCardLvlUi.innerHTML = this.enemyTarget.level;
        Player.targetUi.hidden = false;
        return true;
      }
    }

    return false;
  }

  attackEnemyTarget() {
    console.log('[Player] [Attack Enemy Target]');
    if (this.enemyTarget) {
      this.attackingEnemy = true;
      return true;
    }
    return false;
  }

  cancelAttack() {
    console.log('[Player] [Cancel Attack]');
    this.attackingEnemy = false;
  }

  cancelTarget() {
    this.enemyTarget = null;
    Player.targetUi.hidden = true;
  }

  collect() {
    console.log('[Player] [Collect]');
    for (let i = 0; i < game.currentMap.loot.length; i++) {
      const loot = game.currentMap.loot[i];
      if (this.collectibleInRange(loot)) {
        this.collectLoot(loot);
        return { 'type': 'loot', 'index': i };
      }
    }

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

  collectLoot(loot) {
    console.log('[Player] [Collect] [Collect Loot]');
    for (let reward of loot.rewards) {
      // console.log(reward);
      if (reward['name'] == 'Credits') {
        this.inventory.addCredits(reward['quantity']);
      } else if (reward['name'] == 'Uridium') {
        this.inventory.addUridium(reward['quantity']);
      } else if (reward['name'] == 'Prometium') {
        this.inventory.addResource('Prometium', reward['quantity']);
      } else if (reward['name'] == 'Endurium') {
        this.inventory.addResource('Endurium', reward['quantity']);
      } else if (reward['name'] == 'Terbium') {
        this.inventory.addResource('Terbium', reward['quantity']);
      }
    }
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

  portalInRange(portal) {
    let s = '[Player] [Portal In Range]';
    if (
      ((portal.x - 10) < this.xAnchor) &&
      (this.xAnchor < (portal.x + Portal.radius + 10)) &&
      ((portal.y - 10) < this.yAnchor) &&
      (this.yAnchor < (portal.y + Portal.radius + 10))
    ) {
      console.log(`${s} true`);
      return true;
    } else {
      console.log(`${s} false`);
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

  updateUi() {
    Player.levelUi.innerHTML = this.level;
    Player.hpUi.innerHTML = this.health;
    Player.maxHpUi.innerHTML = this.maxHealth;
    Player.dpsUi.innerHTML = this.dps;
    Player.damageUi.innerHTML = this.damage;
    Player.fireRateUi.innerHTML = this.fireRate;
    Player.attackRangeUi.innerHTML = this.attackRange;
    Player.accuracyUi.innerHTML = this.accuracy;
    Player.criticalRateUi.innerHTML = this.criticalRate;
    Player.criticalDamageUi.innerHTML = this.criticalDamage;
    Player.speedUi.innerHTML = this.maxSpeedX;
    Player.playerTotalExperienceUi.innerHTML = this.totalExperience;
    Player.playerCurrentExperienceUi.innerHTML = this.experience;
    Player.playerLevelExperienceUi.innerHTML = Player.experienceTable[this.level];
  }

  modifyHealth(value) {
    this.health += value;
    game.playerPortrait.healthBar.value = this.health;
    // this.renderCardHp();

    // Player.playerCardDamageUi.innerHTML = value;
    // window.setTimeout(() => {
    //   Player.playerCardDamageUi.innerHTML = '';
    // }, 500);
  }

  renderCardHp() {
    const percentage = `${Math.round((this.health / this.maxHealth) * 100)}%`;
    Player.cardHpUi.style.width = percentage;
    Player.cardHpUi.innerHTML = percentage;
  }

  render() {
    game.ctx.beginPath();
    game.ctx.lineWidth = 0.5;
    game.ctx.strokeStyle = '#000000';
    game.ctx.fillStyle = '#ffffff';
    game.ctx.rect(this.x, this.y, this.width, this.height);
    game.ctx.fill();
    game.ctx.stroke();

    if (this.attackingEnemy) {
      this.renderCardHp();

      if (getRandomInt(0, 3) != 0) {
        game.ctx.beginPath();
        game.ctx.strokeStyle = '#00ff00';
        game.ctx.lineWidth = 2.0;
        game.ctx.moveTo(this.x + (this.width/2), (this.y + (this.height/2)));
        game.ctx.lineTo(this.enemyTarget.x + (this.enemyTarget.width/2), (this.enemyTarget.y + (this.enemyTarget.height/2)));
        game.ctx.stroke();
      }
    }
  }
}

