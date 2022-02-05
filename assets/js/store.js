class Store {
  static shopCreditsUi = document.querySelector('#shop-credits');
  static shopUridiumUi = document.querySelector('#shop-uridium');
  static shopAmmunitionUi = document.querySelector('#shop-ammunition');
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
  static hpUpPriceUi = document.querySelector('#shop-hp-up-buy-price');
  static damageUpPriceUi = document.querySelector('#shop-damage-up-buy-price');
  static accuracyUpPriceUi = document.querySelector('#shop-accuracy-up-buy-price');
  static attackRangeUpPriceUi = document.querySelector('#shop-attack-range-up-buy-price');
  static uridiumPriceUi = document.querySelector('#shop-uridium-buy-price');

  constructor() {
    this.prices = {
      'ammunition': {
        'buy': { 'credits': 100, 'uridium': 0 },
        'sell': { 'credits': 0, 'uridium': 0 },
      },
      'prometium': {
        'buy': { 'credits': 0, 'uridium': 0 },
        'sell': { 'credits': 10, 'uridium': 0 },
      },
      'endurium': {
        'buy': { 'credits': 0, 'uridium': 0 },
        'sell': { 'credits': 15, 'uridium': 0 },
      },
      'terbium': {
        'buy': { 'credits': 0, 'uridium': 0 },
        'sell': { 'credits': 20, 'uridium': 0 },
      },
      'hpUp': {
        'buy': { 'credits': 0, 'uridium': 100 },
        'sell': { 'credits': 0, 'uridium': 0 },
      },
      'damageUp': {
        'buy': { 'credits': 0, 'uridium': 100 },
        'sell': { 'credits': 0, 'uridium': 0 },
      },
      'accuracyUp': {
        'buy': { 'credits': 0, 'uridium': 100 },
        'sell': { 'credits': 0, 'uridium': 0 },
      },
      'attackRangeUp': {
        'buy': { 'credits': 0, 'uridium': 100 },
        'sell': { 'credits': 0, 'uridium': 0 },
      },
      'uridium': {
        'buy': { 'credits': 100, 'uridium': 0 },
        'sell': { 'credits': 0, 'uridium': 0 },
      }
    }
  }

  buy(item) {
    if (!(game.currentMap.base && game.currentMap.base.playerInRange())) {
      new ShopErrorMessage('May only buy while ship is at base');
      return;
    }

    switch(item) {
      case 'ammunition':
        if (game.player.inventory.removeCredits(this.prices.ammunition.buy.credits)) {
          game.player.inventory.addAmmunition(100);
          new ShopSuccessMessage('Received: Ammunition x100');
        } else {
          console.log('ERROR: Insufficient Credits supply for this trade');
        }
        break;
      case 'hpUp':
        if (game.player.inventory.removeUridium(this.prices.hpUp.buy.uridium)) {
          game.player.modifyMaxHealth(25);
          new ShopSuccessMessage('Received: HP increase +25');
        } else {
          console.log('ERROR: Insufficient Uridium supply for this trade');
        }
        break;
      case 'damageUp':
        if (game.player.inventory.removeUridium(this.prices.damageUp.buy.uridium)) {
          game.player.damage += 5;
          game.player.updateDps();
          new ShopSuccessMessage('Received: Damage increase +5');
        } else {
          console.log('ERROR: Insufficient Uridium supply for this trade');
        }
        break;
      case 'accuracyUp':
        if (game.player.inventory.removeUridium(this.prices.hpUp.buy.uridium)) {
          game.player.accuracy += 0.1;
          game.player.updateDps();
          new ShopSuccessMessage('Received: Accuracy increase +0.1');
        } else {
          console.log('ERROR: Insufficient Uridium supply for this trade');
        }
        break;
      case 'attackRangeUp':
        if (game.player.inventory.removeUridium(this.prices.attackRangeUp.buy.uridium)) {
          game.player.attackRange += 10;
          new ShopSuccessMessage('Received: Attack range increase +10');
        } else {
          console.log('ERROR: Insufficient Uridium supply for this trade');
        }
        break;
      case 'uridium':
        if (game.player.inventory.removeCredits(this.prices.uridium.buy.credits)) {
          game.player.inventory.addUridium(10);
          new ShopSuccessMessage('Received: Uridium x10');
        } else {
          console.log('ERROR: Insufficient Credit supply for this trade');
        }
        break;
      default:
        console.log('ERROR: Invalid purchase');
    }

    this.updateUi();
  }

  sell(resource) {
    if (!(game.currentMap.base && game.currentMap.base.playerInRange())) {
      new ShopErrorMessage('May only sell while ship is at base');
      return;
    }

    switch(resource) {
      case 'prometium':
        if (game.player.inventory.removeResource('Prometium', Store.prometiumSellInputUi.value)) {
          game.player.inventory.addCredits(Store.prometiumSellInputUi.value * this.prices[resource]['sell'].credits);
          Store.prometiumSellInputUi.value = 0;
        } else {
          console.log('ERROR: Insufficient Prometium supply for this trade');
        }
        break;
      case 'endurium':
        if (game.player.inventory.removeResource('Endurium', Store.enduriumSellInputUi.value)) {
          game.player.inventory.addCredits(Store.enduriumSellInputUi.value * this.prices[resource]['sell'].credits);
          Store.enduriumSellInputUi.value = 0;
        } else {
          console.log('ERROR: Insufficient Endurium supply for this trade');
        }
        break;
      case 'terbium':
        if (game.player.inventory.removeResource('Terbium', Store.terbiumSellInputUi.value)) {
          game.player.inventory.addCredits(Store.terbiumSellInputUi.value * this.prices[resource]['sell'].credits);
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

  updateUi() {
    Store.shopCreditsUi.innerHTML = game.player.inventory.credits;
    Store.shopUridiumUi.innerHTML = game.player.inventory.uridium;;
    Store.shopAmmunitionUi.innerHTML = game.player.inventory.stash['Ammunition'];

    Store.prometiumUi.innerHTML = game.player.inventory.stash['Prometium'];
    Store.enduriumUi.innerHTML = game.player.inventory.stash['Endurium'];
    Store.terbiumUi.innerHTML = game.player.inventory.stash['Terbium'];

    Store.prometiumPriceUi.innerHTML = `${this.prices.prometium.sell.credits}C`;
    Store.enduriumPriceUi.innerHTML = `${this.prices.endurium.sell.credits}C`;
    Store.terbiumPriceUi.innerHTML = `${this.prices.terbium.sell.credits}C`;

    Store.uridiumPriceUi.innerHTML = `${this.prices.uridium.buy.credits}C`;
    Store.ammunitionPriceUi.innerHTML = `${this.prices.ammunition.buy.credits}C`;
    Store.hpUpPriceUi.innerHTML = `${this.prices.hpUp.buy.uridium}U`;
    Store.damageUpPriceUi.innerHTML = `${this.prices.damageUp.buy.uridium}U`;
    Store.accuracyUpPriceUi.innerHTML = `${this.prices.accuracyUp.buy.uridium}U`;
    Store.attackRangeUpPriceUi.innerHTML = `${this.prices.attackRangeUp.buy.uridium}U`;
  }
}

