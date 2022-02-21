class AbilityBar {
  constructor() {
    this.sprite = new Rectangle(
      (Game.canvasWidth / 2) - (264 / 2),
      Game.canvasHeight - 150,
      264,
      60,
      null
    );
    this.sprite.strokeColor = '#ffffff';
    this.sprite.fill = false;
  }

  render() {
    this.sprite.render();
    game.player.autoAttackAbility.render();
    game.player.rocketAbility.render();
  }
}

