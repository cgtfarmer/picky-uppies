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
    // this.inventoryInputHandler = new InventoryInputHandler();
    this.inventoryScreen = false;
    this.eventLog = new EventLog();
    this.attackingMsg = new Text(
      (Game.canvasWidth / 2),
      55,
      'Attacking',
      20,
      '#ff0000',
      'center'
    );

    this.playerPortrait = new Portrait(
      (Game.canvasWidth * (1/3)) - (300 / 2) - 50,
      5
    );
    this.playerPortrait.name = 'Player';

    this.targetPortrait = new Portrait(
      (Game.canvasWidth * (2/3)) - (300 / 2) + 50,
      5
    );
    this.targetPortrait.name = 'Enemy';

    this.experienceBar = new ExperienceBar(
      10,
      Game.canvasHeight - 20,
      Game.canvasWidth - 20,
      20
    );
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

      if (enemy.attackingPlayer) {
        if (enemy.playerInDisengageRange()) {
          if(enemy.playerInRange()) {
            this.handleEnemyAttack(enemy);

            if (this.player.health <= 0) {
              this.player.die();
            }
          }
        } else {
          console.log('Player exceeded disengage range, cancelling enemy attack');
          enemy.attackingPlayer = false;
        }
      } else {
        if (enemy.demeanor == 'aggressive' && enemy.playerInAggroRange()) {
          console.log('Player entered aggro range on aggressive enemy, initiating enemy attack');
          enemy.attackingPlayer = true;
        }
      }
    }

    if (this.player.attackingEnemy &&
        this.player.enemyInRange(this.player.enemyTarget)) {
      this.handlePlayerAttack();

      if (this.player.enemyTarget.health <= 0) {
        this.player.attackingEnemy = false;

        this.player.addExperience(this.player.enemyTarget.experience);

        this.player.enemyTarget.die();

        this.currentMap.enemies.push(
          this.currentMap.generateRandomEnemy(
            this.player.enemyTarget.name,
            this.player.enemyTarget.level
          )
        );

        this.player.cancelTarget();
      }
    }

    if (this.currentMap.base &&
        this.currentMap.base.playerInRange() &&
        !this.player.attackingEnemy &&
        (this.player.health < this.player.maxHealth)) {
      this.player.modifyHealth(1);
    }

    this.renderFrame();
    // this.updateDebugText();
  }

  handlePlayerAttack() {
    if ((this.player.fireTicker / 1000) >= this.player.fireRate) {
      this.player.fire();
      this.player.fireTicker = 0;
      console.log('Player completed attack on enemy, initiating enemy attack');
      this.player.enemyTarget.attackingPlayer = true;
    } else {
      this.player.fireTicker += this.tickerIncrement;
    }
  }

  handleEnemyAttack(enemy) {
    if ((enemy.fireTicker / 1000) >= enemy.fireRate) {
      enemy.fire();
      enemy.fireTicker = 0;
    } else {
      enemy.fireTicker += this.tickerIncrement;
    }
  }

  renderFrame() {
    this.clearFrame();

    if (this.inventoryScreen) {
    } else {
      this.currentMap.render();

      this.player.render();

      this.playerPortrait.render();

      if (this.player.enemyTarget) this.targetPortrait.render();

      this.experienceBar.render();

      this.eventLog.render();

      if (this.player.attackingEnemy) {
        this.attackingMsg.render();
      }
    }
  }

  clearFrame() {
    this.ctx.clearRect(0, 0, Game.canvasWidth, Game.canvasHeight);
  }

  updateDebugText() {
    Game.debugText.innerHTML = `
      # DEBUG
      x: ${this.player.sprite.x}
      y: ${this.player.sprite.y}
      xp: ${this.player.experience}
      attacking: ${this.player.attackingEnemy}
      target: ${this.player.enemyTarget}
      resources: (${this.currentMap.resources.length}) ${this.currentMap.resources}
      bonusBoxes: (${this.currentMap.bonusBoxes.length}) ${this.currentMap.bonusBoxes}
      enemies: (${this.currentMap.enemies.length}) ${this.currentMap.enemies}
    `;
  }
}

