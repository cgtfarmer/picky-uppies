class DamageFlashMessage extends FlashMessage {
  constructor(x, y, damage, criticalHit, expirationTimer) {
    let color = null;
    if (damage >= 0) {
      if (criticalHit) {
        color = '#ff0000';
      } else {
        color = '#ffffff';
      }
    } else {
      color = '#00ff00';
    }
    super(x, y, damage, 25, color, 'center', expirationTimer);
  }
}

