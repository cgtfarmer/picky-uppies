class Kristallon extends Enemy {
  constructor(x, y, level) {
    console.log('[Kristallon] [Constructor]');
    super(x, y);
    this.name = 'Kristallon';
    this.attackingPlayer = false;
    this.level = level;
    this.fireTicker = 0;
    this.attackRange = 450;
    this.aggroRange = 450;
    this.disengageRange = 500;
    this.demeanor = 'aggressive';
    this.sprite = new Rectangle(x, y, 150, 150, '#00ffff');

    this.initLvlStats();

    this.speedX = getRandomInt(this.maxSpeedX * -1, this.maxSpeedX);
    this.speedY = getRandomInt(this.maxSpeedY * -1, this.maxSpeedY);
    this.loot = this.generateRandomLoot();
  }

  initLvlStats() {
    switch(this.level) {
      case 5:
        this.maxSpeedX = 10;
        this.maxSpeedY = 10;
        this.maxHealth = 1250;
        this.health = 1250;
        this.damage = 100;
        this.fireRate = 1.5;
        this.experience = 1000;
        this.lootTable = [
          { name: 'Credits', maxQuantity: 2500 },
          { name: 'Uridium', maxQuantity: 300 },
          { name: 'Prometium', maxQuantity: 100 },
          { name: 'Endurium', maxQuantity: 75 },
          { name: 'Terbium', maxQuantity: 50 }
        ];
        break;
      default:
        console.log('ERROR: Invalid enemy level');
    }
  }
}


