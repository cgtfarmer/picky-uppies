class Store {
  static prometiumSellInputUi = document.querySelector('#prometium-sell-input');
  static enduriumSellInputUi = document.querySelector('#endurium-sell-input');
  static terbiumSellInputUi = document.querySelector('#terbium-sell-input');
  static prometiumUi = document.querySelector('#shop-prometium');
  static enduriumUi = document.querySelector('#shop-endurium');
  static terbiumUi = document.querySelector('#shop-terbium');
  static prometiumPriceUi = document.querySelector('#shop-prometium-sell-price');
  static enduriumPriceUi = document.querySelector('#shop-endurium-sell-price');
  static terbiumPriceUi = document.querySelector('#shop-terbium-sell-price');
  static ammunitionPriceUi = document.querySelector('#shop-ammunition-buy-price');

  constructor() {
    this.prices = {
      'ammunition': {
        'buy': 100,
        'sell': 0,
      },
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

  buy(item) {
    if (!this.baseInRange()) {
      new ShopErrorMessage('May only buy while ship is at base');
      return;
    }

    switch(item) {
      case 'ammunition':
        if (game.player.inventory.removeCredits(this.prices.ammunition.buy)) {
          game.player.inventory.addAmmunition(100);
        } else {
          console.log('ERROR: Insufficient Credits supply for this trade');
        }
        break;
      default:
        console.log('ERROR: Invalid purchase');
    }

    this.updateUi();
  }

  sell(resource) {
    if (!this.baseInRange()) {
      new ShopErrorMessage('May only sell while ship is at base');
      return;
    }

    switch(resource) {
      case 'prometium':
        if (game.player.inventory.removeResource('Prometium', Store.prometiumSellInputUi.value)) {
          game.player.inventory.addCredits(Store.prometiumSellInputUi.value * this.prices[resource]['sell']);
          Store.prometiumSellInputUi.value = 0;
        } else {
          console.log('ERROR: Insufficient Prometium supply for this trade');
        }
        break;
      case 'endurium':
        if (game.player.inventory.removeResource('Endurium', Store.enduriumSellInputUi.value)) {
          game.player.inventory.addCredits(Store.enduriumSellInputUi.value * this.prices[resource]['sell']);
          Store.enduriumSellInputUi.value = 0;
        } else {
          console.log('ERROR: Insufficient Endurium supply for this trade');
        }
        break;
      case 'terbium':
        if (game.player.inventory.removeResource('Terbium', Store.terbiumSellInputUi.value)) {
          game.player.inventory.addCredits(Store.terbiumSellInputUi.value * this.prices[resource]['sell']);
          Store.terbiumSellInputUi.value = 0;
        } else {
          console.log('ERROR: Insufficient Terbium supply for this trade');
        }
        break;
      default:
        console.log('ERROR: Invalid max sell resource');
    }

    this.updateUi();
  }

  maxSell(resource) {
    switch(resource) {
      case 'prometium':
        Store.prometiumSellInputUi.value = game.player.inventory.stash['Prometium'];
        break;
      case 'endurium':
        Store.enduriumSellInputUi.value = game.player.inventory.stash['Endurium'];
        break;
      case 'terbium':
        Store.terbiumSellInputUi.value = game.player.inventory.stash['Terbium'];
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

  updateUi() {
    Store.prometiumUi.innerHTML = game.player.inventory.stash['Prometium'];
    Store.enduriumUi.innerHTML = game.player.inventory.stash['Endurium'];
    Store.terbiumUi.innerHTML = game.player.inventory.stash['Terbium'];

    Store.prometiumPriceUi.innerHTML = this.prices.prometium.sell;
    Store.enduriumPriceUi.innerHTML = this.prices.endurium.sell;
    Store.terbiumPriceUi.innerHTML = this.prices.terbium.sell;

    Store.ammunitionPriceUi.innerHTML = this.prices.ammunition.buy;
  }
}

