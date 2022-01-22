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
    this.player.x += this.player.speedX;
    this.player.y += this.player.speedY;

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

        if (this.player.enemyTarget.health <= 0) {
          this.player.attackingEnemy = false;

          this.player.addExperience(this.player.enemyTarget.experience);

          this.player.enemyTarget.die();

          this.currentMap.enemies.push(this.currentMap.generateRandomEnemy());

          this.player.cancelTarget();
        }
      } else {
        this.player.attackingEnemy = false;
      }
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

