class Lordakia extends Enemy {
  constructor(x, y, level) {
    console.log('[Lordakia] [Constructor]');
    super(x, y);
    this.name = 'Lordakia';
    this.attackingPlayer = false;
    this.level = level;
    this.fireTicker = 0;
    this.attackRange = 125;
    this.aggroRange = 150;
    this.disengageRange = 250;
    this.demeanor = 'aggressive';
    this.sprite = new Rectangle(x, y, 30, 30, '#0000ff');

    this.initLvlStats();

    this.speedX = getRandomInt(this.maxSpeedX * -1, this.maxSpeedX);
    this.speedY = getRandomInt(this.maxSpeedY * -1, this.maxSpeedY);
    this.loot = this.generateRandomLoot();
  }

  initLvlStats() {
    switch(this.level) {
      case 1:
        this.maxSpeedX = 5;
        this.maxSpeedY = 5;
        this.maxHealth = 80;
        this.health = 80;
        this.damage = 3;
        this.fireRate = 0.8;
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
        this.maxSpeedX = 8;
        this.maxSpeedY = 8;
        this.maxHealth = 80;
        this.health = 80;
        this.damage = 3;
        this.fireRate = 0.8;
        this.experience = 20;
        this.lootTable = [
          { name: 'Credits', maxQuantity: 125 },
          { name: 'Uridium', maxQuantity: 5 },
          { name: 'Prometium', maxQuantity: 5 },
          { name: 'Endurium', maxQuantity: 3 },
          { name: 'Terbium', maxQuantity: 2 }
        ];
        break;
      case 3:
        this.maxSpeedX = 12;
        this.maxSpeedY = 12;
        this.maxHealth = 110;
        this.health = 110;
        this.damage = 5;
        this.fireRate = 0.8;
        this.experience = 40;
        this.lootTable = [
          { name: 'Credits', maxQuantity: 175 },
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



