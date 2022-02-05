class HealthBar extends ProgressBar {
  constructor(x, y, width, height) {
    console.log('[Health Bar] [Constructor]');
    super(x, y, width, height, '#ff0000', '#555555');
  }
}

