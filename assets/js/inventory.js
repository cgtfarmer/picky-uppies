class Inventory {
  constructor() {
    this.credits = 0;
    this.uridium = 0;
    this.capacity = 100;
    this.size = 0;
    this.stash = {
      'Prometium': 0,
      'Endurium': 0,
      'Terbium': 0
    }
    this.creditsUi = document.querySelector('#credits');
    this.uridiumUi = document.querySelector('#uridium');
    this.prometiumUi = document.querySelector('#prometium');
    this.enduriumUi = document.querySelector('#endurium');
    this.terbiumUi = document.querySelector('#terbium');

    this.updateCurrencyUi();
    this.updateResourceUi();
  }

  addCredits(amount) {
    // console.log(`addResource(${name}, ${count})`);
    this.credits += amount;
    this.updateCurrencyUi();
    return true;
  }

  removeCredits(amount) {
    // console.log(`addResource(${name}, ${count})`);
    if (amount > this.credits) {
      console.log('ERROR: Not enough credits');
      return false;
    }

    this.credits -= amount;
    this.updateCurrencyUi();
    return true;
  }

  addUridium(amount) {
    // console.log(`addResource(${name}, ${count})`);
    this.uridium += amount;
    this.updateCurrencyUi();
    return true;
  }

  removeUridium(amount) {
    // console.log(`addResource(${name}, ${count})`);
    if (amount > this.uridium) {
      console.log('ERROR: Not enough uridium');
      return false;
    }

    this.uridium -= amount;
    this.updateCurrencyUi();
    return true;
  }

  addResource(name, count) {
    console.log(`addResource(${name}, ${count})`);
    if (!this.validResource(name)) {
      console.log('ERROR: Adding invalid resource');
      return false;
    }

    this.stash[name] += 1;
    this.size += count;
    this.updateResourceUi();
  }

  removeResource(name, count) {
    if (!this.validResource(name)) {
      console.log('ERROR: Removing invalid resource');
      return false;
    }

    if (count > this.stash[name]) {
      console.log('ERROR: Removing too many of resource');
      return false;
    }

    this.stash[name] -= count;
    this.updateResourceUi();
    return true;
  }

  updateCurrencyUi() {
    this.creditsUi.innerHTML = this.credits;
    this.uridiumUi.innerHTML = this.uridium;
  }

  updateResourceUi() {
    this.prometiumUi.innerHTML = this.stash['Prometium'];
    this.enduriumUi.innerHTML = this.stash['Endurium'];
    this.terbiumUi.innerHTML = this.stash['Terbium'];
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

