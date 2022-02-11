class CastBar extends ProgressBar {
  constructor(x, y, width, height) {
    console.log('[Cast Bar] [Constructor]');
    super(x, y, width, height, '#00ffff90', '#88888890');
    this.updateText('Auto Attack');
    this.update(0, 1);
  }

  update(value, maxValue) {
    console.log('[Cast Bar] [Update]');
    this.value = value;
    this.maxValue = maxValue;
    this.foreground.width = this.width * (this.value / this.maxValue);
  }

  updateText(text) {
    console.log('[Cast Bar] [Update Text]');
    this.text.content = text;
  }
}

