class Inventory {
  static sizeUi = document.querySelector('#inventory-size');
  static capacityUi = document.querySelector('#inventory-capacity');
  static creditsUi = document.querySelector('#credits');
  static uridiumUi = document.querySelector('#uridium');
  static ammunitionUi = document.querySelector('#ammunition');
  static prometiumUi = document.querySelector('#inventory-prometium');
  static enduriumUi = document.querySelector('#inventory-endurium');
  static terbiumUi = document.querySelector('#inventory-terbium');

  constructor() {
    this.credits = 1000;
    this.uridium = 100;
    this.capacity = 100;
    this.size = 0;
    this.stash = {
      'Prometium': 0,
      'Endurium': 0,
      'Terbium': 0,
      'Ammunition': 1000
    }

    this.updateUi();
  }

  addCredits(amount) {
    console.log(`[Inventory] [Add Credits] ${amount}`);
    this.credits += amount;
    this.updateCurrencyUi();
    return true;
  }

  removeCredits(amount) {
    console.log(`[Inventory] [Remove Credits] ${amount}`);
    if (amount > this.credits) {
      console.log('ERROR: Not enough credits');
      return false;
    }

    this.credits -= amount;
    this.updateCurrencyUi();
    return true;
  }

  addUridium(amount) {
    console.log(`[Inventory] [Add Uridium] ${amount}`);
    this.uridium += amount;
    this.updateCurrencyUi();
    return true;
  }

  removeUridium(amount) {
    console.log(`[Inventory] [Remove Uridium] ${amount}`);
    if (amount > this.uridium) {
      console.log('ERROR: Not enough uridium');
      return false;
    }

    this.uridium -= amount;
    this.updateCurrencyUi();
    return true;
  }

  addAmmunition(amount) {
    console.log(`[Inventory] [Add Ammunition] ${amount}`);
    this.stash['Ammunition'] += amount;
    this.updateAmmunitionUi();
    return true;
  }

  removeAmmunition(amount) {
    console.log(`[Inventory] [Remove Ammunition] ${amount}`);
    if (amount > this.stash['Ammunition']) {
      console.log('ERROR: Not enough ammunition');
      return false;
    }

    this.stash['Ammunition'] -= amount;
    this.updateAmmunitionUi();
    return true;
  }

  addResource(name, count) {
    console.log(`[Inventory] [Add Resource] ${name}, ${count}`);
    if (!this.validResource(name)) {
      console.log('ERROR: Adding invalid resource');
      return false;
    }

    this.stash[name] += 1;
    this.size += count;
    return true;
  }

  removeResource(name, count) {
    console.log(`[Inventory] [Remove Resource] ${name}, ${count}`);
    if (!this.validResource(name)) {
      console.log('ERROR: Removing invalid resource');
      return false;
    }

    if (count > this.stash[name]) {
      console.log('ERROR: Removing too many of resource');
      return false;
    }

    this.stash[name] -= count;
    this.size -= count;
    return true;
  }

  updateUi() {
    this.updateCurrencyUi();
    this.updateResourceUi();
    this.updateAmmunitionUi();
  }

  updateCurrencyUi() {
    console.log('[Inventory] [Update Currency UI]');
    Inventory.creditsUi.innerHTML = this.credits;
    Inventory.uridiumUi.innerHTML = this.uridium;
  }

  updateResourceUi() {
    console.log('[Inventory] [Update Resource UI]');
    Inventory.sizeUi.innerHTML = this.size;
    Inventory.capacityUi.innerHTML = this.capacity;
    Inventory.prometiumUi.innerHTML = this.stash['Prometium'];
    Inventory.enduriumUi.innerHTML = this.stash['Endurium'];
    Inventory.terbiumUi.innerHTML = this.stash['Terbium'];
  }

  updateAmmunitionUi() {
    console.log('[Inventory] [Update Ammunition UI]');
    Inventory.ammunitionUi.innerHTML = this.stash['Ammunition'];
  }

  validResource(name) {
    return Object.keys(this.stash).includes(name)
  }

  toString() {
    let s = `
      capacity: ${this.capacity}
      size: ${this.size}
    `;

    for (let key of Object.keys(this.stash)) {
      s += `${key}: ${this.stash[key]}\n`;
    }

    return s.trim();
  }
}

