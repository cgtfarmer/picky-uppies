class Ability {
  constructor(name, damage, castTime, range) {
    this.name = name;
    this.damage = damage;
    this.castTime = castTime;
    this.range = range;
    this.cooldown = 0;
    this.remainigCooldown = 0;
    this.cooldownText = null;
    this.cooldownDampener = null;

    this.sprite = new Rectangle(
      game.abilityBar.sprite.x + 5,
      game.abilityBar.sprite.y + 5,
      50,
      50,
      '#88888890'
    );

    this.keybindText = new Text(
      this.sprite.x + 50 - 5,
      this.sprite.y + 50 - 5,
      'F',
      15,
      '#000000',
      'end'
    );

    this.attackDampener = new Rectangle(
      game.abilityBar.sprite.x + 5,
      game.abilityBar.sprite.y + 5,
      50,
      50,
      '#ff000055'
    );
  }

  generateSprite() {
    console.log('[Ability] [Generate Sprite]');

    console.log('ERROR: Override this method');
  }

  perform() {
    console.log('[Ability] [Perform]');
    if (this.cooldown > 0) {
      this.remainingCooldown = this.cooldown;
      game.cooldownAbilities.push(this);
    }
    game.currentMap.projectiles.push(this.generateSprite());
  }

  render() {
    this.sprite.render();
    if (this.remainingCooldown > 0) {
      this.cooldownDampener.render();
      this.cooldownText.render();
    }
    this.keybindText.render();
    if (game.player.attackingEnemy && this == game.player.currentAbility) {
      this.attackDampener.render();
    }
  }
}

