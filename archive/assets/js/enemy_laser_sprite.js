class EnemyLaserSprite extends Projectile {
  constructor(x, y, target, damage) {
    super(x, y, target, damage, false);
    this.maxSpeedX = 20;
    this.maxSpeedY = 20;
    this.speedX = 0;
    this.speedY = 0;
    this.damage = damage;
    this.target = target;
    this.sprite = new Rectangle(x, y, 45, 5, '#ff0000');
  }

  inflictDamage() {
    this.target.modifyHealth(this.damage * -1);
    game.currentMap.flashMessages.push(
      new DamageFlashMessage(
        this.target.sprite.xAnchor,
        this.target.sprite.yAnchor - this.target.sprite.height - 10,
        this.damage,
        false,
        750
      )
    );
    // this.target.attackingPlayer = true;
    // this.target.target = game.player;
  }
}

