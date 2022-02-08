class EventLog {
  constructor() {
    console.log('[Event Log] [Constructor]');
    this.messages = [];
    this.fontSize = 15;
    this.padding = 5;
    this.lines = 10;
    this.background = new Rectangle(
      10,
      Game.canvasHeight - (this.lines * this.fontSize) - 45,
      425,
      ((this.lines * this.fontSize) + this.fontSize + this.padding - 3),
      '#ffffff'
    )
    this.background.strokeColor = '#ffffff';
    this.background.fill = false;
  }

  addMessage(msg) {
    console.log('[Event Log] [Add Message]');
    if (this.messages.length >= this.lines) {
      this.messages.splice(0, 1);
      for (let i = 0; i < this.messages.length; i++) {
        this.messages[i].y = (
          this.background.y +
          this.fontSize +
          (i * this.fontSize) +
          this.padding
        )
      }
    }

    this.messages.push(
      new Text(
        this.background.x + this.padding,
        this.background.y +
          this.fontSize +
          (this.messages.length * this.fontSize) +
          this.padding,
        msg,
        this.fontSize,
        '#ffffff',
        'start'
      )
    );
  }

  render() {
    this.background.render();

    for (let message of this.messages) {
      message.render();
    }
  }
}

