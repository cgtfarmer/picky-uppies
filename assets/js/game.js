class Game {
  static canvas = document.querySelector('#canvas');
  static canvasWidth = 16 * 90; // 1440
  static canvasHeight = 9 * 90; // 810
  static debugText = document.querySelector('#debug-text');

  constructor() {
    console.log('[Game] [Constructor]');
    this.ctx = canvas.getContext('2d');
    this.ctx.lineWidth = 0.5;
    this.ctx.strokeStyle = '#000000';
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
    this.renderFrame();
    // updateDebugText();
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
      resources: (${this.currentMap.resources.length}) ${this.currentMap.resources}
      bonusBoxes: (${this.currentMap.bonusBoxes.length}) ${this.currentMap.bonusBoxes}
    `;
  }
}

