class DamageFlashMessage extends FlashMessage {
  constructor(x, y, damage, expirationTimer) {
    const color = (damage >= 0) ? '#ff0000' : '#00ff00';
    super(x, y, damage, 25, color, 'center', expirationTimer);
  }
}

