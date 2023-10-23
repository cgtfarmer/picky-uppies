class Loot {
  constructor(lootTable) {
    // this.x = null;
    // this.y = null;
    // this.width = 30;
    // this.height = 30;
    // this.color = 'magenta';
    this.lootTable = lootTable;
    this.rewardCount = getRandomInt(
      Math.round(this.lootTable.length * 0.2), this.lootTable.length
    );
    this.rewards = [];
    this.initRandomRewards();
    this.sprite = null;
  }

  spawn(x, y) {
    this.sprite = new Rectangle(x, y, 30, 30, 'magenta');
  }

  initRandomRewards() {
    for (let i = 0; i < this.rewardCount; i++) {
      const randomIndex = getRandomInt(0, this.lootTable.length - 1);
      const selection = this.lootTable[randomIndex];

      const preexistingReward = this.rewards.find(e => e.name == selection.name);
      if (preexistingReward) {
        preexistingReward.quantity += getRandomInt(
          selection.maxQuantity * 0.2,
          selection.maxQuantity
        )
      } else {
        this.rewards.push({
          name: selection.name,
          quantity: getRandomInt(
            selection.maxQuantity * 0.2,
            selection.maxQuantity
          )
        });
      }
    }
  }

  render() {
    this.sprite.render();
    // game.ctx.beginPath();
    // game.ctx.lineWidth = 0.5;
    // game.ctx.strokeStyle = '#000000';
    // game.ctx.fillStyle = this.color;
    // game.ctx.rect(this.x, this.y, this.width, this.height);
    // game.ctx.fill();
    // game.ctx.stroke();
  }

  toString() {
    let s = '';
    for (let i = 0; i < (this.rewards.length - 1); i++) {
      const reward = this.rewards[i];
      s += `${reward.name}: ${reward.quantity}, `;
    }
    s += `${this.rewards[this.rewards.length-1].name}: ${this.rewards[this.rewards.length-1].quantity}`;
    return s;
  }
}

