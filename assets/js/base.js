class Base {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 75;
    this.height = 75;
    this.color = 'gray';
  }

  render() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
    ctx.stroke();
  }
}

