class Ability {
  constructor(name, damage, castTime, range) {
    this.name = name;
    this.damage = damage;
    this.castTime = castTime;
    this.range = range;
  }

  perform() {
    console.log('[Ability] [Perform]');

    game.currentMap.projectiles.push(
      new Projectile(
        game.player.sprite.xAnchor,
        game.player.sprite.yAnchor,
        game.player.enemyTarget,
        game.player.computeAbilityDamage()
      )
    );
  }
}

