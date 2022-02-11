class RocketAbility extends Ability {
  constructor() {
    super('Rocket', 30, 2, 200);
  }

  generateSprite() {
    console.log('[Auto Attack Ability] [Generate Sprite]');

    return new RocketSprite(
      game.player.sprite.xAnchor,
      game.player.sprite.yAnchor,
      game.player.enemyTarget,
      game.player.computeAbilityDamage(this.name)
    );
  }
}

