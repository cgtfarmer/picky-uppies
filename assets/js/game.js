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
      const newDirection = getRandomInt(0, 15);
      if (newDirection == 0) {
        if (getRandomInt(1, 10) <= 4) {
          enemy.speedX = 0;
          enemy.speedY = 0;
        } else {
          enemy.speedX = getRandomInt(enemy.maxSpeedX * -1, enemy.maxSpeedX);
          enemy.speedY = getRandomInt(enemy.maxSpeedY * -1, enemy.maxSpeedY);
        }
      }

      if (
        ((enemy.x + enemy.speedX) < 0) ||
        ((enemy.x + enemy.speedX) > (this.currentMap.width - enemy.width))
      ) {
        enemy.speedX = 0;
      } else {
        enemy.x += enemy.speedX;
      }

      if (
        ((enemy.y + enemy.speedY) < 0) ||
        ((enemy.y + enemy.speedY) > (this.currentMap.height - enemy.height))
      ) {
        enemy.speedY = 0;
      } else {
        enemy.y += enemy.speedY;
      }
    }

    if (this.player.attackingEnemy &&
      !this.player.enemyInRange(this.player.enemyTarget)) {
      this.player.attackingEnemy = false;
    }

    if (this.player.attackingEnemy) {
      this.player.inventory.stash['Ammunition'] -= 1;
      ammunitionUi.innerHTML = this.player.inventory.stash['Ammunition'];

      this.player.enemyTarget.health -= (
        this.player.dps * (this.tickerIncrement / MILLISECONDS_PER_SECOND)
      )

      if (this.player.enemyTarget.health <= 0) {
        this.player.attackingEnemy = false;

        // this.player.enemyTarget.die();
        for (let i = 0; i < this.currentMap.enemies.length; i++) {
          // console.log(`${i}: ${this.currentMap.enemies[i].health} ${this.player.enemyTarget.health}`);
          if (this.currentMap.enemies[i] == this.player.enemyTarget) {
            this.player.enemyTarget.dropLoot();
            this.currentMap.enemies.splice(i, 1);
            break;
          }
        }

        this.player.experience += this.player.enemyTarget.experience;
        const percentage = `${Math.round((this.player.experience / 100) * 100)}%`;
        experienceUi.style.width = percentage;
        experienceUi.innerHTML = percentage;

        this.currentMap.enemies.push(this.currentMap.generateRandomEnemy());

        this.player.enemyTarget = null;
        targetUi.hidden = true;
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

