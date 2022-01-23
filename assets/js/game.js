class Game {
  static canvas = document.querySelector('#canvas');
  static canvasWidth = 16 * 85; // 1360
  static canvasHeight = 9 * 85; // 765
  static debugText = document.querySelector('#debug-text');

  constructor() {
    console.log('[Game] [Constructor]');
    this.ctx = canvas.getContext('2d');
    this.tickerIncrement = 100; // milliseconds
    this.player = null;
    this.store = null;
    this.timer = null;
    this.maps = [];
    this.currentMap = null;
    this.inputHandler = new InputHandler();
  }

  start() {
    console.log('[Game] [Start]');
    this.renderFrame();
    this.timer = window.setInterval(() => {
      game.tick();
    }, game.tickerIncrement);
  }

  tick() {
    this.player.speedX = 0;
    this.player.speedY = 0;
    this.inputHandler.performKeyActions();
    this.player.move();

    for (let enemy of this.currentMap.enemies) {
      enemy.move();
    }

    if (this.player.attackingEnemy) {
      if (this.player.enemyInRange(this.player.enemyTarget)) {
        if ((this.player.fireTicker / 1000) >= this.player.fireRate) {
          this.player.fire();
          this.player.fireTicker = 0;
        } else {
          this.player.fireTicker += this.tickerIncrement;
        }

        if ((this.player.enemyTarget.fireTicker / 1000) >= this.player.enemyTarget.fireRate) {
          this.player.enemyTarget.fire();
          this.player.enemyTarget.fireTicker = 0;
        } else {
          this.player.enemyTarget.fireTicker += this.tickerIncrement;
        }

        // TODO: What happens if you switch targets while
        //       attacking a different target?

        if (this.player.enemyTarget.health <= 0) {
          this.player.attackingEnemy = false;

          this.player.addExperience(this.player.enemyTarget.experience);

          this.player.enemyTarget.die();

          this.currentMap.enemies.push(this.currentMap.generateRandomEnemy());

          this.player.cancelTarget();
        }

        if (this.player.health <= 0) {
          this.player.attackingEnemy = false;

          this.player.cancelTarget();

          if (this.player.inventory.credits >= 1000) {
            this.player.inventory.removeCredits(1000);
            new ErrorMessage('You died. You have lost 1000 credits');
          } else {
            this.player.inventory.removeCredits(this.player.inventory.credits);
            new ErrorMessage(`You died. You have lost ${this.player.inventory.credits} credits`);
          }

          this.player.health = 0;
          game.currentMap = this.maps[0];
          game.player.x = this.currentMap.base.x;
          game.player.y = this.currentMap.base.y;
        }
      } else {
        this.player.attackingEnemy = false;
      }
    }

    if (this.currentMap.base &&
        this.currentMap.base.playerInRange() &&
        !this.player.attackingEnemy &&
        (this.player.health < this.player.maxHealth)) {
      this.player.health += 1;
      this.player.renderCardHp();
    }

    this.renderFrame();
    // this.updateDebugText();
  }

  renderFrame() {
    this.clearFrame();

    this.currentMap.render();

    this.player.render();
  }

  clearFrame() {
    this.ctx.clearRect(0, 0, Game.canvasWidth, Game.canvasHeight);
  }

  updateDebugText() {
    Game.debugText.innerHTML = `
      # DEBUG
      x: ${this.player.x}
      y: ${this.player.y}
      xp: ${this.player.experience}
      attacking: ${this.player.attackingEnemy}
      target: ${this.player.enemyTarget}
      resources: (${this.currentMap.resources.length}) ${this.currentMap.resources}
      bonusBoxes: (${this.currentMap.bonusBoxes.length}) ${this.currentMap.bonusBoxes}
      enemies: (${this.currentMap.enemies.length}) ${this.currentMap.enemies}
    `;
  }
}

