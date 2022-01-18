class Map {
  /**
   * Ex:
   * options = {
   *   resources: {
   *     count: 10,
   *     selection: [0, 1, 2],
   *   },
   *   bonusBoxes: {
   *     count: 3
   *   },
   * }
   */
  constructor(width, height, options) {
    this.width = 1440;
    this.height = 810;
    this.resources = [];
    this.bonusBoxes = [];
    this.initResources(options.resources);
    this.initBonusBoxes(options.bonusBoxes);
  }

  initBonusBoxes(options) {
    const offset = 35;
    const x = getRandomInt(0, (this.width - offset));
    const y = getRandomInt(0, (this.height - offset));
    for (let i = 0; i < options.count; i++) {
      this.bonusBoxes.push(new BonusBox(x, y));
    }
  }

  initResources(options) {
    for (let i = 0; i < options.count; i++) {
      this.resources.push(generateRandomResource(options.selection));
    }
  }

  generateRandomResource(selection) {
    // TODO: Make this way awesomer - string classname to class instantiation?
    const offset = 35;
    const resourceSelection = selection[getRandomInt(0, selection.length - 1)];
    const x = getRandomInt(0, (this.width - offset));
    const y = getRandomInt(0, (this.height - offset));

    switch(resourceSelection) {
      case 0:
        this.resources.push(new Prometium(x, y));
        break;
      case 1:
        this.resources.push(new Endurium(x, y));
        break;
      case 2:
        this.resources.push(new Terbium(x, y));
        break;
      default:
        console.log('ERROR: Invalid random resource');
    }
  }
}

