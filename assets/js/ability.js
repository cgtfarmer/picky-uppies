class Ability {
  constructor(name, damage, castTime, range) {
    this.name = name;
    this.damage = damage;
    this.castTime = castTime;
    this.range = range;
  }

  generateSprite() {
    console.log('[Ability] [Generate Sprite]');

    console.log('ERROR: Override this method');
  }

  perform() {
    console.log('[Ability] [Perform]');

    game.currentMap.projectiles.push(this.generateSprite());
  }
}

