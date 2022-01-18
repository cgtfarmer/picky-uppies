class Store {
  constructor() {
    this.prometiumSellInput = document.querySelector('#prometium-sell-input');
    this.enduriumSellInput = document.querySelector('#endurium-sell-input');
    this.terbiumSellInput = document.querySelector('#terbium-sell-input');
  }

  sell(resource) {
    switch(resource) {
      case 'prometium':
        if (inventory.removeResource('Prometium', this.prometiumSellInput.value)) {
          inventory.addCredits(this.prometiumSellInput.value * 10);
          this.prometiumSellInput.value = 0;
        } else {
          console.log('ERROR: Insufficient Prometium supply for this trade');
        }
        break;
      case 'endurium':
        if (inventory.removeResource('Endurium', this.enduriumSellInput.value)) {
          inventory.addCredits(this.enduriumSellInput.value * 10);
          this.enduriumSellInput.value = 0;
        } else {
          console.log('ERROR: Insufficient Endurium supply for this trade');
        }
        break;
      case 'terbium':
        if (inventory.removeResource('Terbium', this.terbiumSellInput.value)) {
          inventory.addCredits(this.terbiumSellInput.value * 10);
          this.terbiumSellInput.value = 0;
        } else {
          console.log('ERROR: Insufficient Terbium supply for this trade');
        }
        break;
      default:
        console.log('ERROR: Invalid max sell resource');
    }
  }

  maxSell(resource) {
    switch(resource) {
      case 'prometium':
        this.prometiumSellInput.value = inventory.stash['Prometium'];
        break;
      case 'endurium':
        this.enduriumSellInput.value = inventory.stash['Endurium'];
        break;
      case 'terbium':
        this.terbiumSellInput.value = inventory.stash['Terbium'];
        break;
      default:
        console.log('ERROR: Invalid max sell resource');
    }
  }
}

