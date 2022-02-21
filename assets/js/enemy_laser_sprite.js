class EnemyLaserSprite extends Projectile {
  constructor(x, y, target, damage) {
    super(x, y, target, damage);
    this.maxSpeedX = 20;
    this.maxSpeedY = 20;
    this.speedX = 0;
    this.speedY = 0;
    this.damage = damage;
    this.target = target;
    this.sprite = new Rectangle(x, y, 45, 5, '#00ff00');
  }

  inflictDamage() {
    this.target.modifyHealth(this.damage * -1);
    // this.target.attackingPlayer = true;
    // this.target.target = game.player;
  }
}

