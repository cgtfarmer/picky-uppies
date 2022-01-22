class Store {
  static prometiumSellInput = document.querySelector('#prometium-sell-input');
  static enduriumSellInput = document.querySelector('#endurium-sell-input');
  static terbiumSellInput = document.querySelector('#terbium-sell-input');

  constructor() {
    this.prices = {
      'prometium': {
        'buy': 0,
        'sell': 10,
      },
      'endurium': {
        'buy': 0,
        'sell': 15,
      },
      'terbium': {
        'buy': 0,
        'sell': 20,
      }
    }
  }

  sell(resource) {
    if (!this.baseInRange()) {
      new ErrorMessage('ERROR: May only sell at a base');
      return;
    }

    switch(resource) {
      case 'prometium':
        if (game.player.inventory.removeResource('Prometium', Store.prometiumSellInput.value)) {
          game.player.inventory.addCredits(Store.prometiumSellInput.value * this.prices[resource]['sell']);
          Store.prometiumSellInput.value = 0;
        } else {
          console.log('ERROR: Insufficient Prometium supply for this trade');
        }
        break;
      case 'endurium':
        if (game.player.inventory.removeResource('Endurium', Store.enduriumSellInput.value)) {
          game.player.inventory.addCredits(Store.enduriumSellInput.value * this.prices[resource]['sell']);
          Store.enduriumSellInput.value = 0;
        } else {
          console.log('ERROR: Insufficient Endurium supply for this trade');
        }
        break;
      case 'terbium':
        if (game.player.inventory.removeResource('Terbium', Store.terbiumSellInput.value)) {
          game.player.inventory.addCredits(Store.terbiumSellInput.value * this.prices[resource]['sell']);
          Store.terbiumSellInput.value = 0;
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
        Store.prometiumSellInput.value = game.player.inventory.stash['Prometium'];
        break;
      case 'endurium':
        Store.enduriumSellInput.value = game.player.inventory.stash['Endurium'];
        break;
      case 'terbium':
        Store.terbiumSellInput.value = game.player.inventory.stash['Terbium'];
        break;
      default:
        console.log('ERROR: Invalid max sell resource');
    }
  }

  baseInRange() {
    return game.currentMap.base && (
      game.currentMap.base.x <= game.player.x &&
      game.player.x <= (game.currentMap.base.x + game.currentMap.base.width) &&
      game.currentMap.base.y <= game.player.y &&
      game.player.y <= (game.currentMap.base.y + game.currentMap.base.height)
    )
  }
}

