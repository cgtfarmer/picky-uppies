class BonusBox {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rewards = [];
    this.rewardCount = getRandomInt(0, 5);
    for (let i = 0; i < this.rewardCount; i++) {

    }
  }

  generateRandomResource() {
    // TODO: Make this way awesomer - string classname to class instantiation?
    const resourceSelection = selection[getRandomInt(0, selection.length - 1)];

    switch(resourceSelection) {
      case 0:
        this.rewards.push(new Prometium(0, 0));
        break;
      case 1:
        this.rewards.push(new Endurium(0, 0));
        break;
      case 2:
        this.rewards.push(new Terbium(0, 0));
        break;
      default:
        console.log('ERROR: Invalid random resource');
    }
  }
}


