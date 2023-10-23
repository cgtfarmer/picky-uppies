class AutoAttackAbility extends Ability {
  constructor() {
    super('Auto Attack', 0, 1, 150);
  }

  generateSprite() {
    console.log('[Auto Attack Ability] [Generate Sprite]');

    const [damage, criticalHit] = game.player.computeAbilityDamage(this.name);
    return new LaserSprite(
      game.player.sprite.xAnchor,
      game.player.sprite.yAnchor,
      game.player.enemyTarget,
      damage,
      criticalHit
    );
  }
}

