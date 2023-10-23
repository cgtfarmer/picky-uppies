class Sibelon extends Enemy {
  constructor(x, y, level) {
    console.log('[Sibelon] [Constructor]');
    super(x, y);
    this.name = 'Sibelon';
    this.attackingPlayer = false;
    this.level = level;
    this.fireTicker = 0;
    this.attackRange = 250;
    this.aggroRange = 175;
    this.disengageRange = 350;
    this.demeanor = 'aggressive';
    this.sprite = new Rectangle(x, y, 125, 125, '#008080');

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
        this.maxHealth = 800;
        this.health = 800;
        this.damage = 50;
        this.fireRate = 2;
        this.experience = 500;
        this.lootTable = [
          { name: 'Credits', maxQuantity: 1300 },
          { name: 'Uridium', maxQuantity: 175 },
          { name: 'Prometium', maxQuantity: 60 },
          { name: 'Endurium', maxQuantity: 40 },
          { name: 'Terbium', maxQuantity: 28 }
        ];
        break;
      default:
        console.log('ERROR: Invalid enemy level');
    }
  }
}

