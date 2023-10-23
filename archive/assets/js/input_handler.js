class InputHandler {
  static keydownEvent = 'keydown';
  static listeningKeys = [
    KeyCode.w,
    KeyCode.a,
    KeyCode.s,
    KeyCode.d,
    KeyCode.spacebar,
    KeyCode.tab,
    KeyCode.esc,
    KeyCode.f,
    KeyCode.r,
    KeyCode.j,
    KeyCode.i,
    KeyCode.leftArrow,
    KeyCode.rightArrow,
    KeyCode.upArrow,
    KeyCode.downArrow,
    KeyCode.num1,
    KeyCode.num2,
    KeyCode.num3,
    KeyCode.num4,
    KeyCode.num5,
  ];

  constructor() {
    this.keys = {};
    this.spaceHasBeenEvaluated = false;
    this.tabHasBeenEvaluated = false;
    this.escHasBeenEvaluated = false;
    this.fHasBeenEvaluated = false;
    this.jHasBeenEvaluated = false;
    this.iHasBeenEvaluated = false;
    this.rHasBeenEvaluated = false;
    this.num1HasBeenEvaluated = false;
    this.num2HasBeenEvaluated = false;
    this.num3HasBeenEvaluated = false;
    this.num4HasBeenEvaluated = false;
    this.num5HasBeenEvaluated = false;
  }

  registerKey(event) {
    // Don't register if opposite key is currently registered?
    console.log(event.keyCode);
    if (InputHandler.listeningKeys.includes(event.keyCode)) {
      if (!([KeyCode.i, KeyCode.r].includes(event.keyCode))) {
        event.preventDefault();
      }
    }

    this.keys[event.keyCode] = (event.type == InputHandler.keydownEvent);
  }

  unregisterKey(event) {
    this.keys[event.keyCode] = (event.type == InputHandler.keydownEvent);
    if (event.keyCode == KeyCode.spacebar) this.spaceHasBeenEvaluated = false;
    if (event.keyCode == KeyCode.tab) this.tabHasBeenEvaluated = false;
    if (event.keyCode == KeyCode.esc) this.escHasBeenEvaluated = false;
    if (event.keyCode == KeyCode.f) this.fHasBeenEvaluated = false;
    if (event.keyCode == KeyCode.j) this.jHasBeenEvaluated = false;
    if (event.keyCode == KeyCode.i) this.iHasBeenEvaluated = false;
    if (event.keyCode == KeyCode.r) this.rHasBeenEvaluated = false;
    if (event.keyCode == KeyCode.num1) this.num1HasBeenEvaluated = false;
    if (event.keyCode == KeyCode.num2) this.num2HasBeenEvaluated = false;
    if (event.keyCode == KeyCode.num3) this.num3HasBeenEvaluated = false;
    if (event.keyCode == KeyCode.num4) this.num4HasBeenEvaluated = false;
    if (event.keyCode == KeyCode.num5) this.num5HasBeenEvaluated = false;
  }

  performKeyActions() {
    if (Object.keys(this.keys).length == 0) return;

    if (this.keys[KeyCode.a] || this.keys[KeyCode.leftArrow]) { game.player.speedX = game.player.maxSpeedX * -1; }
    if (this.keys[KeyCode.d] || this.keys[KeyCode.rightArrow]) { game.player.speedX = game.player.maxSpeedX; }
    if (this.keys[KeyCode.w] || this.keys[KeyCode.upArrow]) { game.player.speedY = game.player.maxSpeedY * -1; }
    if (this.keys[KeyCode.s] || this.keys[KeyCode.downArrow]) { game.player.speedY = game.player.maxSpeedY; }

    if (this.keys[KeyCode.j] && !this.jHasBeenEvaluated) {
      console.log('[Input Handler] [j]');
      this.jHasBeenEvaluated = true;

      for (let i = 0; i < game.currentMap.portals.length; i++) {
        const portal = game.currentMap.portals[i];
        if (portal.playerInRange()) {
          portal.jump();
          break;
        }
      }
    }

    if (this.keys[KeyCode.tab] && !this.tabHasBeenEvaluated) {
      console.log('[Input Handler] [Tab]');
      this.tabHasBeenEvaluated = true;
      game.player.targetNearestEnemy();
    }

    if (this.keys[KeyCode.esc] && !this.escHasBeenEvaluated) {
      console.log('[Input Handler] [Escape]');
      this.escHasBeenEvaluated = true;

      if (game.player.attackingEnemy) {
        game.player.cancelAttack();
      } else if (game.player.enemyTarget) {
        game.player.cancelTarget();
      }
    }

    if (this.keys[KeyCode.f] && !this.fHasBeenEvaluated) {
      console.log('[Input Handler] [f]');
      this.fHasBeenEvaluated = true;
      if (!game.player.attackingEnemy) {
        game.player.startAutoAttack();
      } else {
        game.player.cancelAutoAttack();
      }
    }

    if (this.keys[KeyCode.i] && !this.iHasBeenEvaluated) {
      console.log('[Input Handler] [i]');
      this.iHasBeenEvaluated = true;

      if (game.inventoryScreen) {
        game.inventoryScreen = false;
      } else {
        game.inventoryScreen = true;
      }
    }

    if (this.keys[KeyCode.spacebar] && !this.spaceHasBeenEvaluated) {
      console.log('[Input Handler] [Space]');
      this.spaceHasBeenEvaluated = true;
      const results = game.player.collect();
      if (results == -1) return;

      if (results['type'] == 'resource') {
        new SuccessMessage(`Received: [${game.currentMap.resources[results['index']].toString()}]`);
        game.eventLog.addMessage(`Received: [${game.currentMap.resources[results['index']].toString()}]`);
        game.currentMap.resources.splice(results['index'], 1);
        game.currentMap.generateRandomResource();
      } else if (results['type'] == 'bonusBox') {
        new SuccessMessage(`Received: [${game.currentMap.bonusBoxes[results['index']].toString()}]`);
        game.eventLog.addMessage(`Received: [${game.currentMap.bonusBoxes[results['index']].toString()}]`);
        game.currentMap.bonusBoxes.splice(results['index'], 1);
        game.currentMap.generateRandomBonusBox();
      } else if (results['type'] == 'loot') {
        new SuccessMessage(`Received: [${game.currentMap.loot[results['index']].toString()}]`);
        game.eventLog.addMessage(`Received: [${game.currentMap.loot[results['index']].toString()}]`);
        game.currentMap.loot.splice(results['index'], 1);
      }
    }

    if (this.keys[KeyCode.r] && !this.rHasBeenEvaluated) {
      console.log('[Input Handler] [R]');
      this.rHasBeenEvaluated = true;

      game.player.cast('Rocket');
    }

    // if (this.keys[KeyCode.num1] && !this.num2HasBeenEvaluated) {
    //   console.log('[Input Handler] [1]');
    //   this.num1HasBeenEvaluated = true;
    // }

    // if (this.keys[KeyCode.num2] && !this.num2HasBeenEvaluated) {
    //   console.log('[Input Handler] [2]');
    //   this.num2HasBeenEvaluated = true;
    // }

    // if (this.keys[KeyCode.num3] && !this.num3HasBeenEvaluated) {
    //   console.log('[Input Handler] [3]');
    //   this.num3HasBeenEvaluated = true;
    // }

    // if (this.keys[KeyCode.num4] && !this.num4HasBeenEvaluated) {
    //   console.log('[Input Handler] [4]');
    //   this.num4HasBeenEvaluated = true;
    // }

    // if (this.keys[KeyCode.num5] && !this.num5HasBeenEvaluated) {
    //   console.log('[Input Handler] [5]');
    //   this.num5HasBeenEvaluated = true;
    // }
  }
}

