class Player {
  constructor() {
    this.width = 50;
    this.height = 50;
    this.x = 50;
    this.y = 50;
    this.maxSpeedX = 10;
    this.maxSpeedY = 10;
    this.speedX = 0;
    this.speedY = 0;
  }

  collectResource() {
    if (inventory.size >= inventory.capacity) {
      console.log('ERROR: Inventory is full');
      return false;
    }

    for (let i = 0; i < resources.length; i++) {
      const resource = resources[i];
      if (this.resourceInRange(resource)) {
        inventory.addResource(resource.name, 1)
        resources.splice(i, 1);
        return true;
      }
    }
  }

  resourceInRange(resource) {
    if (
      (this.x < resource.x) &&
      (resource.x < (this.x + this.width)) &&
      (this.y < resource.y) &&
      (resource.y < (this.y + this.height))
    ) {
      return true;
    } else {
      return false;
    }
  }
}

