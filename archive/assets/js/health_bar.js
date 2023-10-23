class HealthBar extends ProgressBar {
  constructor(x, y, width, height) {
    console.log('[Health Bar] [Constructor]');
    super(x, y, width, height, '#ff000090', '#55555590');
  }
}

