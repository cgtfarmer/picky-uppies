class Struener extends Enemy {
  constructor(x, y, level) {
    console.log('[Struener] [Constructor]');
    super(x, y);
    this.name = 'Struener';
    this.attackingPlayer = false;
    this.level = level;
    this.fireTicker = 0;
    this.attackRange = 125;
    this.aggroRange = 150;
    this.disengageRange = 250;
    this.demeanor = 'neutral';
    this.sprite = new Rectangle(x, y, 40, 40, '#ff0000');

    this.initLvlStats();

    this.speedX = getRandomInt(this.maxSpeedX * -1, this.maxSpeedX);
    this.speedY = getRandomInt(this.maxSpeedY * -1, this.maxSpeedY);
    this.loot = this.generateRandomLoot();
  }

  initLvlStats() {
    switch(this.level) {
      case 1:
        this.maxSpeedX = 3;
        this.maxSpeedY = 3;
        this.maxHealth = 100;
        this.health = 100;
        this.damage = 3;
        this.fireRate = 1.0;
        this.experience = 15;
        this.lootTable = [
          { name: 'Credits', maxQuantity: 100 },
          { name: 'Uridium', maxQuantity: 5 },
          { name: 'Prometium', maxQuantity: 5 },
          { name: 'Endurium', maxQuantity: 3 },
          { name: 'Terbium', maxQuantity: 2 }
        ];
        break;
      case 2:
        this.maxSpeedX = 4;
        this.maxSpeedY = 4;
        this.maxHealth = 150;
        this.health = 150;
        this.damage = 5;
        this.fireRate = 0.9;
        this.experience = 30;
        this.demeanor = 'aggressive';
        this.lootTable = [
          { name: 'Credits', maxQuantity: 150 },
          { name: 'Uridium', maxQuantity: 5 },
          { name: 'Prometium', maxQuantity: 7 },
          { name: 'Endurium', maxQuantity: 5 },
          { name: 'Terbium', maxQuantity: 3 }
        ];
        break;
      case 3:
        this.maxSpeedX = 5;
        this.maxSpeedY = 5;
        this.maxHealth = 200;
        this.health = 150;
        this.damage = 7;
        this.fireRate = 0.8;
        this.experience = 55;
        this.demeanor = 'aggressive';
        this.lootTable = [
          { name: 'Credits', maxQuantity: 225 },
          { name: 'Uridium', maxQuantity: 7 },
          { name: 'Prometium', maxQuantity: 10 },
          { name: 'Endurium', maxQuantity: 7 },
          { name: 'Terbium', maxQuantity: 5 }
        ];
        break;
      default:
        console.log('ERROR: Invalid enemy level');
    }
  }
}


