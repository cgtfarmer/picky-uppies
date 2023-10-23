class RocketAbility extends Ability {
  constructor() {
    super('Rocket', 30, 2, 200);
    this.cooldown = 8;
    this.remainingCooldown = 0;

    this.sprite.x = (game.abilityBar.sprite.x + 5) + 1 + 50;

    this.keybindText.x = this.sprite.x + 50 - 5;
    this.keybindText.content = 'R';

    if (this.cooldown > 0) {
      this.cooldownText = new Text(
        this.sprite.x + (this.sprite.width / 2),
        this.sprite.y + (this.sprite.height / 2) + (15 / 3),
        this.remainingCooldown,
        15,
        '#ffffff',
        'center'
      );
    }

    this.cooldownDampener = new Rectangle(
      (game.abilityBar.sprite.x + 5) + 1 + 50,
      game.abilityBar.sprite.y + 5,
      50,
      50,
      '#28282890'
    );

    this.attackDampener.x = (game.abilityBar.sprite.x + 5) + 1 + 50;
  }

  advanceCooldown(amount) {
    this.remainingCooldown -= (amount / 1000);
    if (this.remainingCooldown <= 0) {
      const index = game.cooldownAbilities.findIndex((e) => e == this);
      game.cooldownAbilities.splice(index, 1);
      this.remainingCooldown = 0;
    }
    // console.log(this.remainingCooldown);
    this.cooldownText.content = Math.ceil(this.remainingCooldown);
  }

  generateSprite() {
    console.log('[Rocket Ability] [Generate Sprite]');

    const [damage, criticalHit] = game.player.computeAbilityDamage(this.name);
    return new RocketSprite(
      game.player.sprite.xAnchor,
      game.player.sprite.yAnchor,
      game.player.enemyTarget,
      damage,
      criticalHit
    );
  }

  render() {
    super.render();
    this.attackDampener
  }
}

