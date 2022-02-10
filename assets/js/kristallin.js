class Kristallin extends Enemy {
  constructor(x, y, level) {
    console.log('[Kristallin] [Constructor]');
    super(x, y);
    this.name = 'Kristallin';
    this.attackingPlayer = false;
    this.level = level;
    this.fireTicker = 0;
    this.attackRange = 150;
    this.aggroRange = 130;
    this.disengageRange = 300;
    this.demeanor = 'aggressive';
    this.sprite = new Rectangle(x, y, 50, 50, '#00ffff');

    this.initLvlStats();

    this.speedX = getRandomInt(this.maxSpeedX * -1, this.maxSpeedX);
    this.speedY = getRandomInt(this.maxSpeedY * -1, this.maxSpeedY);
    this.loot = this.generateRandomLoot();
  }

  initLvlStats() {
    switch(this.level) {
      case 4:
        this.maxSpeedX = 15;
        this.maxSpeedY = 15;
        this.maxHealth = 250;
        this.health = 250;
        this.damage = 30;
        this.fireRate = 0.6;
        this.experience = 300;
        this.lootTable = [
          { name: 'Credits', maxQuantity: 400 },
          { name: 'Uridium', maxQuantity: 50 },
          { name: 'Prometium', maxQuantity: 20 },
          { name: 'Endurium', maxQuantity: 10 },
          { name: 'Terbium', maxQuantity: 5 }
        ];
        break;
      default:
        console.log('ERROR: Invalid enemy level');
    }
  }
}



