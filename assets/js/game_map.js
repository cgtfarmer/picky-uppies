class GameMap {

  static offset = 35;

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
    console.log('[GameMap] [Constructor]');
    this.width = width;
    this.height = height;
    this.resourceSelection = options.resources.selection;
    this.resources = [];
    this.bonusBoxes = [];
    this.enemies = [];
    this.base = new Base(options.base.x, options.base.y);
    this.backgroundStarCoords = [];

    this.initResources(options.resources);
    this.initBonusBoxes(options.bonusBoxes);
    this.initEnemies(options.enemies);
    this.initBackgroundStarCoords();
  }

  initBackgroundStarCoords() {
    for (let i = 0; i < 100; i++) {
      const x = getRandomInt(0, this.width);
      const y = getRandomInt(0, this.height);
      this.backgroundStarCoords.push([x, y]);
    }
  }

  initEnemies(options) {
    console.log('[GameMap] [Init Enemies]');
    for (let i = 0; i < options.count; i++) {
      this.enemies.push(this.generateRandomEnemy());
    }
  }

  generateRandomEnemy() {
    const x = getRandomInt(0, (this.width - GameMap.offset));
    const y = getRandomInt(0, (this.height - GameMap.offset));
    return new Enemy(x, y);
  }

  initBonusBoxes(options) {
    console.log('[GameMap] [Init Bonus Boxes]');
    for (let i = 0; i < options.count; i++) {
      this.generateRandomBonusBox();
    }
  }

  generateRandomBonusBox() {
    const x = getRandomInt(0, (this.width - GameMap.offset));
    const y = getRandomInt(0, (this.height - GameMap.offset));
    this.bonusBoxes.push(new BonusBox(x, y));
  }

  initResources(options) {
    console.log('[GameMap] [Init Resources]');
    for (let i = 0; i < options.count; i++) {
      this.generateRandomResource();
    }
  }

  generateRandomResource() {
    console.log('[GameMap] [Generate Random Resource]');
    // TODO: Make this way awesomer - string classname to class instantiation?
    const selection = this.resourceSelection[
      getRandomInt(0, this.resourceSelection.length - 1)
    ];
    const x = getRandomInt(0, (this.width - GameMap.offset));
    const y = getRandomInt(0, (this.height - GameMap.offset));

    switch(selection) {
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

  render() {
    // console.log(this.backgroundStarCoords);
    for (let i = 0; i < this.backgroundStarCoords.length; i++) {
      const coords = this.backgroundStarCoords[i];
      game.ctx.beginPath();
      game.ctx.fillStyle = 'white';
      game.ctx.arc(coords[0], coords[1], 2, 0, 2 * Math.PI, false);
      game.ctx.fill();
      game.ctx.stroke();
    }

    this.base.render();

    for (let bonusBox of this.bonusBoxes) {
      bonusBox.render();
    }

    for (let resource of this.resources) {
      resource.render();
    }

    for (let enemy of this.enemies) {
      enemy.render();
    }
  }
}

