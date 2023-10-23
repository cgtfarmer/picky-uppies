class Player {
  static levelUi = document.querySelector('#player-level');
  static hpUi = document.querySelector('#player-hp');
  static maxHpUi = document.querySelector('#player-max-hp');
  static dpsUi = document.querySelector('#player-dps');
  static damageUi = document.querySelector('#player-damage');
  static accuracyUi = document.querySelector('#player-accuracy');
  static hasteUi = document.querySelector('#player-haste');
  static attackRangeUi = document.querySelector('#player-attack-range');
  static criticalRateUi = document.querySelector('#player-critical-rate');
  static criticalDamageUi = document.querySelector('#player-critical-damage');
  static speedUi = document.querySelector('#player-speed');
  static playerTotalExperienceUi = document.querySelector('#player-total-experience');
  static playerCurrentExperienceUi = document.querySelector('#player-current-experience');
  static playerLevelExperienceUi = document.querySelector('#player-level-experience');
  static experienceUi = document.querySelector('#experience');
  static experienceTable = [
    0, 100, 175, 300, 500, 800, 1300, 1750, 3000, 5000, 0
  ];

  constructor() {
    console.log('[Player] [Constructor]');

    this.sprite = new Rectangle(
      125, 125, 50, 50, '#ffffff'
    );
    this.sprite.xAnchor = this.sprite.x + (this.sprite.width / 2);
    this.sprite.yAnchor = this.sprite.y + (this.sprite.height / 2);
    this.maxSpeedX = 10; // 10, 50
    this.maxSpeedY = 10; // 10, 50
    this.speedX = 0;
    this.speedY = 0;
    this.health = 100;
    this.maxHealth = 100;
    this.haste = 0;
    this.damage = 10.0; // 10.0, 50.0
    this.accuracy = 0.7; // 0.7, 1.7
    this.criticalRate = 0.1;
    this.criticalDamage = 0.5;
    this.dps = null;
    this.attackRange = 0; // 150
    this.targettingRange = 300;
    this.enemyTarget = null;
    this.attackingEnemy = false;
    this.fireTicker = 0;
    this.level = 1;
    this.totalExperience = 0;
    this.experience = 0;
    this.inventory = new Inventory();
    this.updateDps();
    this.updateExperienceUi();

    this.autoAttackAbility = new AutoAttackAbility();
    this.rocketAbility = new RocketAbility();
    this.currentAbility = this.autoAttackAbility;
    this.abilityTimer = 0;
  }

  startAutoAttack() {
    console.log('[Player] [Start Auto Attack]');
    if (!this.enemyTarget) {
      game.eventLog.addMessage('ERROR: No target selected');
      return;
    }

    this.abilityTimer = 0;
    this.currentAbility = this.autoAttackAbility;
    game.castBar.update(this.abilityTimer, this.currentAbility.castTime);
    game.castBar.updateText(this.currentAbility.name);
    this.attackingEnemy = true;
  }

  cancelAutoAttack() {
    console.log('[Player] [Cancel Auto Attack]');
    this.abilityTimer = 0;
    game.castBar.update(this.abilityTimer, this.currentAbility.castTime);
    this.attackingEnemy = false;
  }

  cast(abilityName) {
    console.log('[Player] [Cast]');
    if (!this.enemyTarget) {
      game.eventLog.addMessage('ERROR: No target selected');
      return;
    }

    switch(abilityName) {
      case 'Rocket':
        const abilityOnCooldown = game.cooldownAbilities.find((e) => e == this.rocketAbility);
        if (abilityOnCooldown) {
          game.eventLog.addMessage('ERROR: Ability is still on cooldown');
        } else {
          this.currentAbility = this.rocketAbility;
        }
        break;
      default:
        console.log('ERROR: Invalid ability name provided');
        return;
    }

    if (this.enemyInRange(this.enemyTarget)) {
      this.cancelAutoAttack();
      this.attackingEnemy = true;
      game.castBar.updateText(this.currentAbility.name);
    } else {
      this.currentAbility = this.autoAttackAbility;
      game.eventLog.addMessage('ERROR: Target out of range');
    }
  }

  advanceCastTime() {
    // console.log('[Player] [Advance Cast Time]');
    this.abilityTimer += (game.tickerIncrement / 1000);
    const computedCastTime = this.currentAbility.castTime * (1 - this.haste);
    game.castBar.update(this.abilityTimer, computedCastTime);
    // console.log(this.abilityTimer);
    if (this.abilityTimer > computedCastTime) {
      if (this.enemyInRange(this.enemyTarget)) {
        this.currentAbility.perform();
        game.player.startAutoAttack();
      } else {
        game.eventLog.addMessage('ERROR: Target out of range');
        this.cancelCast();
      }
    }
  }

  delayCastTime() {
  }

  cancelCast() {
    console.log('[Player] [Cancel Cast]');
    if (this.abilityTimer == 0
     && this.currentAbility == this.autoAttackAbility) return;

    this.abilityTimer = 0;
    this.currentAbility = this.autoAttackAbility;
    game.castBar.updateText(this.currentAbility.name);
    game.castBar.update(this.abilityTimer, this.currentAbility.castTime);
  }

  computeAbilityDamage(abilityName) {
    let ability = null;
    switch(abilityName) {
      case 'Auto Attack':
        ability = this.autoAttackAbility;
        break;
      case 'Rocket':
        ability = this.rocketAbility;
        break;
      default:
        console.log('ERROR: Invalid ability name');
    }

    if ((getRandomInt(1, 100) / 100) <= this.accuracy) {
      if ((getRandomInt(1, 100) / 100) <= this.criticalRate) {
        return [(ability.damage + this.damage) * (1 + this.criticalDamage), true];
      } else {
        return [(ability.damage + this.damage), false];
      }
    } else {
      return [0, false];
    }
  }

  move() {
    this.sprite.updatePosition(
      this.sprite.x + this.speedX,
      this.sprite.y + this.speedY
    );

    // this.sprite.x += this.speedX;
    // this.sprite.y += this.speedY;
    // this.sprite.xAnchor = this.sprite.x + (this.sprite.width / 2);
    // this.sprite.yAnchor = this.sprite.y + (this.sprite.height / 2);
  }

  die() {
    console.log('[Player] [Die]');
    this.cancelTarget();

    if (this.inventory.credits >= 1000) {
      this.inventory.removeCredits(1000);
      new ErrorMessage('You died. You have lost 1000 credits');
      game.eventLog.addMessage('You died. You have lost 1000 credits');
    } else {
      this.inventory.removeCredits(this.inventory.credits);
      new ErrorMessage(`You died. You have lost ${this.inventory.credits} credits`);
      game.eventLog.addMessage(`You died. You have lost ${this.inventory.credits} credits`);
    }

    this.health = 0;
    game.currentMap = game.maps[0];
    game.player.sprite.x = game.currentMap.base.sprite.xAnchor;
    game.player.sprite.y = game.currentMap.base.sprite.yAnchor;
  }

  updateDps() {
    this.dps = Math.round(
      this.damage * (1 + this.haste) * (1.0 + this.criticalRate) * this.accuracy * 100
    ) / 100;
  }

  addExperience(experience) {
    this.totalExperience += experience;
    this.experience += experience;

    // if (this.experience >= Player.experienceTable[this.level]) {
    while (this.experience >= Player.experienceTable[this.level]) {
      this.experience -= Player.experienceTable[this.level];
      this.level += 1;
      new SuccessMessage(`You are now level ${this.level}! Your stats have increased`);
      game.eventLog.addMessage(`You are now level ${this.level}! Your stats have increased`);
      this.modifyMaxHealth(10)
      this.setHealth(this.maxHealth);
      this.damage += 1;
      this.criticalRate += 0.025;
      this.criticalDamage += 0.05;
      this.haste += 0.05;
    }

    this.updateExperienceUi();
  }

  updateExperienceUi() {
    // const percentage = `${Math.round((this.experience / Player.experienceTable[this.level]) * 100)}%`;
    // Player.experienceUi.style.width = percentage;
    // Player.experienceUi.innerHTML = percentage;

    // game.experienceBar.level = this.level;
    // game.experienceBar.maxValue = Player.experienceTable[this.level];
    // game.experienceBar.value = this.experience;
    game.experienceBar.update(
      this.level,
      this.experience,
      Player.experienceTable[this.level]
    );

    game.playerPortrait.level = this.level;

    // Player.playerCardLvlUi.innerHTML = this.level;
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
      if (this.enemyInTargettingRange(enemy) && (enemy != this.enemyTarget)) {
        this.enemyTarget = enemy;
        game.targetPortrait.name = this.enemyTarget.name;
        game.targetPortrait.level = this.enemyTarget.level;
        game.targetPortrait.healthBar.update(
          this.enemyTarget.health,
          this.enemyTarget.maxHealth
        );
        // Player.targetCardLvlUi.innerHTML = this.enemyTarget.level;
        // Player.targetUi.hidden = false;
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
    this.cancelCast();
    this.attackingEnemy = false;
  }

  cancelTarget() {
    this.cancelAttack();
    this.enemyTarget = null;
    // Player.targetUi.hidden = true;
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
      game.eventLog.addMessage('ERROR: Your inventory is full. Sell your resources at the base');
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

  enemyInTargettingRange(enemy) {
    return Game.pointInArea(
      [enemy.sprite.xAnchor, enemy.sprite.yAnchor],
      [(this.sprite.xAnchor - this.targettingRange), (this.sprite.xAnchor + this.targettingRange)],
      [(this.sprite.yAnchor - this.targettingRange), (this.sprite.yAnchor + this.targettingRange)]
    );
  }

  enemyInRange(enemy) {
    // const msg = '[Player] [Enemy In Range]';
    const effectiveRange = this.currentAbility.range + this.attackRange;

    return Game.pointInArea(
      [enemy.sprite.xAnchor, enemy.sprite.yAnchor],
      [(this.sprite.xAnchor - effectiveRange), (this.sprite.xAnchor + effectiveRange)],
      [(this.sprite.yAnchor - effectiveRange), (this.sprite.yAnchor + effectiveRange)]
    );
  }

  enemyInAutoAttackRange(enemy) {
    const effectiveRange = this.autoAttackAbility.range + this.attackRange;

    return Game.pointInArea(
      [enemy.sprite.xAnchor, enemy.sprite.yAnchor],
      [(this.sprite.xAnchor - effectiveRange), (this.sprite.xAnchor + effectiveRange)],
      [(this.sprite.yAnchor - effectiveRange), (this.sprite.yAnchor + effectiveRange)]
    );
  }

  collectibleInRange(collectible) {
    console.log('[Player] [Collectible In Range]');

    return Game.pointInArea(
      [collectible.sprite.xAnchor, collectible.sprite.yAnchor],
      [(this.sprite.x), (this.sprite.x + this.sprite.width)],
      [(this.sprite.y), (this.sprite.y + this.sprite.height)]
    );
  }

  updateUi() {
    Player.levelUi.innerHTML = this.level;
    Player.hpUi.innerHTML = this.health;
    Player.maxHpUi.innerHTML = this.maxHealth;
    Player.dpsUi.innerHTML = this.dps;
    Player.damageUi.innerHTML = this.damage;
    Player.hasteUi.innerHTML = this.haste;
    Player.attackRangeUi.innerHTML = this.attackRange;
    Player.accuracyUi.innerHTML = this.accuracy;
    Player.criticalRateUi.innerHTML = this.criticalRate;
    Player.criticalDamageUi.innerHTML = this.criticalDamage;
    Player.speedUi.innerHTML = this.maxSpeedX;
    Player.playerTotalExperienceUi.innerHTML = this.totalExperience;
    Player.playerCurrentExperienceUi.innerHTML = this.experience;
    Player.playerLevelExperienceUi.innerHTML = Player.experienceTable[this.level];
  }

  setHealth(value) {
    this.health = value;
    game.playerPortrait.healthBar.update(this.health, this.maxHealth);
  }

  modifyHealth(value) {
    if ((this.health + value) < this.maxHealth) {
      this.health += value;
    } else {
      this.health = this.maxHealth;
    }

    game.playerPortrait.healthBar.update(this.health, this.maxHealth);

    // Player.playerCardDamageUi.innerHTML = value;
    // window.setTimeout(() => {
    //   Player.playerCardDamageUi.innerHTML = '';
    // }, 500);
  }

  modifyMaxHealth(value) {
    this.maxHealth += value;
    game.playerPortrait.healthBar.update(this.health, this.maxHealth);
  }

  render() {
    this.sprite.render();
  }

  // renderAttackAnimation() {
  //   if (this.currentAbility == this.autoAttackAbility) {
  //     if (getRandomInt(0, 3) != 0) {
  //       game.ctx.beginPath();
  //       game.ctx.strokeStyle = '#00ff00';
  //       game.ctx.lineWidth = 2.0;
  //       game.ctx.moveTo(this.sprite.x + (this.sprite.width/2), (this.sprite.y + (this.sprite.height/2)));
  //       game.ctx.lineTo(this.enemyTarget.sprite.x + (this.enemyTarget.sprite.width/2), (this.enemyTarget.sprite.y + (this.enemyTarget.sprite.height/2)));
  //       game.ctx.stroke();
  //     }
  //   } else {
  //   }
  // }
}

