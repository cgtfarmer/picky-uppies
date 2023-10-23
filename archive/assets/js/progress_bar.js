class ProgressBar {
  constructor(x, y, width, height, color, bgColor) {
    console.log('[Progress Bar] [Constructor]');
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.bgColor = bgColor;
    this.value = 100;
    this.maxValue = 100;

    this.background = new Rectangle(
      this.x,
      this.y,
      this.width,
      this.height,
      this.bgColor
    );

    this.foreground = new Rectangle(
      this.x,
      this.y,
      this.width * (this.value / this.maxValue),
      this.height,
      this.color
    );

    this.text = new Text(
      this.x + (this.width / 2),
      this.y + (this.height / 2) + 5,
      `${this.value} / ${this.maxValue}`,
      15,
      '#ffffff',
      'center'
    );
  }

  update(value, maxValue) {
    console.log('[Progress Bar] [Update]');
    this.value = value;
    this.maxValue = maxValue;
    this.foreground.width = this.width * (this.value / this.maxValue),
    this.text.content = `${Math.round(this.value)} / ${Math.round(this.maxValue)}`;
  }

  render() {
    this.background.render();
    this.foreground.render();
    this.text.render();
  }
}

