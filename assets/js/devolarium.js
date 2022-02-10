class Devolarium extends Enemy {
  constructor(x, y, level) {
    console.log('[Devolarium] [Constructor]');
    super(x, y);
    this.name = 'Devolarium';
    this.attackingPlayer = false;
    this.level = level;
    this.fireTicker = 0;
    this.attackRange = 200;
    this.aggroRange = 150;
    this.disengageRange = 325;
    this.demeanor = 'aggressive';
    this.sprite = new Rectangle(x, y, 100, 60, '#00ff00');

    this.initLvlStats();

    this.speedX = getRandomInt(this.maxSpeedX * -1, this.maxSpeedX);
    this.speedY = getRandomInt(this.maxSpeedY * -1, this.maxSpeedY);
    this.loot = this.generateRandomLoot();
  }

  initLvlStats() {
    switch(this.level) {
      case 3:
        this.maxSpeedX = 4;
        this.maxSpeedY = 4;
        this.maxHealth = 500;
        this.health = 500;
        this.damage = 30;
        this.fireRate = 1.5;
        this.experience = 250;
        this.lootTable = [
          { name: 'Credits', maxQuantity: 1000 },
          { name: 'Uridium', maxQuantity: 150 },
          { name: 'Prometium', maxQuantity: 50 },
          { name: 'Endurium', maxQuantity: 30 },
          { name: 'Terbium', maxQuantity: 20 }
        ];
        break;
      default:
        console.log('ERROR: Invalid enemy level');
    }
  }
}

