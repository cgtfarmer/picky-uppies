class BonusBox {
  static options = [
    { 'name': 'Credits', 'quantity': 100 },
    { 'name': 'Uridium', 'quantity': 10 },
    { 'name': 'Ammunition', 'quantity': 25 }
  ];

  constructor(x, y) {
    // this.x = x;
    // this.y = y;
    // this.width = 30;
    // this.height = 30;
    // this.color = 'cyan';
    this.rewardCount = getRandomInt(1, 5);
    this.rewards = [];
    this.initRandomRewards();
    this.sprite = new Rectangle(x, y, 30, 30, 'cyan');
  }

  initRandomRewards() {
    console.log('[Bonux Box] [Init Random Rewards]');
    for (let i = 0; i < this.rewardCount; i++) {
      const randomIndex = getRandomInt(0, BonusBox.options.length - 1);
      const selection = BonusBox.options[randomIndex];

      const preexistingReward =
        this.rewards.find(e => (e['name'] == selection['name']));
      if (preexistingReward) {
        preexistingReward['quantity'] += selection['quantity'];
      } else {
        this.rewards.push({
          'name': selection['name'],
          'quantity': selection['quantity'],
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

