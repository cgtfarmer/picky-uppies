class AutoAttackAbility extends Ability {
  constructor() {
    super('Auto Attack', 0, 1, 150);
  }

  generateSprite() {
    console.log('[Auto Attack Ability] [Generate Sprite]');

    return new LaserSprite(
      game.player.sprite.xAnchor,
      game.player.sprite.yAnchor,
      game.player.enemyTarget,
      game.player.computeAbilityDamage(this.name)
    );
  }
}

