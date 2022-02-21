class EnemyAutoAttackAbility extends Ability {
  constructor(enemy) {
    super('Enemy Auto Attack', 0, 1, 150);
    this.owner = enemy;
  }

  generateSprite() {
    console.log('[Enemy Auto Attack Ability] [Generate Sprite]');

    const projectile = new EnemyLaserSprite(
      this.owner.sprite.xAnchor,
      this.owner.sprite.yAnchor,
      this.owner.target,
      this.owner.computeAbilityDamage(this.name)
    );
    projectile.sprite.fillColor = '#ff0000';

    return projectile;
  }
}

