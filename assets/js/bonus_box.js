class BonusBox {
  static options = [
    { name: 'Credits', quantity: 100 },
    { name: 'Uridium', quantity: 10 },
    { name: 'Ammunition', quantity: 25 }
  ];

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.color = 'pink';
    this.rewardCount = getRandomInt(1, 5);
    this.rewards = [];
    this.initRandomRewards();
  }

  initRandomRewards() {
    for (let i = 0; i < this.rewardCount; i++) {
      const randomIndex = getRandomInt(0, BonusBox.options.length - 1);
      const selection = BonusBox.options[randomIndex];
      this.rewards.push(selection);
    }
  }

  render() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
    ctx.stroke();
  }

  toString(x, y) {
    return `${this.constructor.name}(${this.x}, ${this.y})`;
  }
}

