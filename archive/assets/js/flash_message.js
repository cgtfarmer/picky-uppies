class FlashMessage extends Text {
  constructor(x, y, content, size, color, alignment, expirationTimer) {
    super(x, y, content, size, color, alignment);
    this.expirationTimer = expirationTimer || 5000;
  }

  decrement(amount) {
    // console.log(this.expirationTimer);
    this.expirationTimer -= amount;
    if (this.expirationTimer <= 0) {
      this.die();
    }
  }

  die() {
    const index = game.currentMap.flashMessages.findIndex((e) => e == this);
    game.currentMap.flashMessages.splice(index, 1);
  }
}

