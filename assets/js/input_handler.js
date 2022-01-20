class InputHandler {
  static keydownEvent = 'keydown';
  static listeningKeys = [
    KeyCode.w,
    KeyCode.a,
    KeyCode.s,
    KeyCode.d,
    KeyCode.spacebar,
    KeyCode.leftArrow,
    KeyCode.rightArrow,
    KeyCode.upArrow,
    KeyCode.downArrow
  ];

  constructor() {
    this.keys = {};
    this.spaceHasBeenEvaluated = false;
  }

  registerKey(event) {
    // Don't register if opposite key is currently registered?
    // console.log(event.keyCode);
    if (InputHandler.listeningKeys.includes(event.keyCode)) {
      event.preventDefault();
    }

    this.keys[event.keyCode] = (event.type == InputHandler.keydownEvent);
  }

  unregisterKey(event) {
    this.keys[event.keyCode] = (event.type == InputHandler.keydownEvent);
    if (event.keyCode == KeyCode.spacebar) this.spaceHasBeenEvaluated = false;
  }

  performKeyActions() {
    if (Object.keys(this.keys).length == 0) return;

    if (this.keys[KeyCode.a] || this.keys[KeyCode.leftArrow]) { game.player.speedX = game.player.maxSpeedX * -1; }
    if (this.keys[KeyCode.d] || this.keys[KeyCode.rightArrow]) { game.player.speedX = game.player.maxSpeedX; }
    if (this.keys[KeyCode.w] || this.keys[KeyCode.upArrow]) { game.player.speedY = game.player.maxSpeedY * -1; }
    if (this.keys[KeyCode.s] || this.keys[KeyCode.downArrow]) { game.player.speedY = game.player.maxSpeedY; }
    if (this.keys[KeyCode.spacebar]) {
      if (!this.spaceHasBeenEvaluated) {
        // console.log('Registering spacebar');
        this.spaceHasBeenEvaluated = true;
        const results = game.player.collect();
        if (results == -1) return;

        if (results['type'] == 'resource') {
          game.currentMap.resources.splice(results['index'], 1);
          game.currentMap.generateRandomResource();
        } else if (results['type'] == 'bonusBox') {
          game.currentMap.bonusBoxes.splice(results['index'], 1);
          game.currentMap.generateRandomBonusBox();
        }

        // this.spaceHasBeenEvaluated = true;
      } else {
        // console.log('Not registering spacebar');
      }
    }
  }
}

