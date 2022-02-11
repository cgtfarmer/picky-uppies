class RocketSprite extends Projectile {
  constructor(x, y, target, damage) {
    super(x, y, target, damage);
    this.maxSpeedX = 15;
    this.maxSpeedY = 15;
    this.speedX = 0;
    this.speedY = 0;
    this.damage = damage;
    this.target = target;
    this.sprite = new Rectangle(x, y, 15, 10, '#ff0000');
  }
}

