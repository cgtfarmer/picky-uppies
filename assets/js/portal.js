class Portal {
  static radius = 50;
  static margin = 15;

  static mapCoordinates(section, map) {
    switch(section) {
      case 'topLeft':
        return [
          Portal.radius + Portal.margin, Portal.radius + Portal.margin
        ]
        break;
      case 'topRight':
        return [
          map.width - Portal.radius - Portal.margin,
          Portal.radius + Portal.margin
        ]
        break;
      case 'bottomLeft':
        return [
          Portal.radius + Portal.margin,
          map.height - Portal.radius - Portal.margin
        ]
        break;
      case 'bottomRight':
        return [
          map.width - Portal.radius - Portal.margin,
          map.height - Portal.radius - Portal.margin
        ]
      case 'center':
        return [
          map.width / 2, map.height / 2
        ]
        break;
      default:
        console.log('ERROR: Invalid section');
    }

    return null;
  }

  constructor(coords, toMap) {
    console.log('[Portal] [Constructor]');
    this.x = coords[0];
    this.y = coords[1];
    this.width = 20;
    this.toMap = toMap;
    this.color = '#bbbbbb';
    this.toX = 0;
    this.toY = 0;
  }

  jump() {
    console.log('[Portal] [Jump]');
    game.currentMap = this.toMap;
    game.player.x = this.toX;
    game.player.y = this.toY;
  }

  render() {
    game.ctx.beginPath();
    game.ctx.lineWidth = 2;
    game.ctx.strokeStyle = '#000000';
    game.ctx.fillStyle = this.color;
    game.ctx.arc(this.x, this.y, Portal.radius, 0, 2 * Math.PI, false);
    game.ctx.fill();
    game.ctx.stroke();

    game.ctx.beginPath();
    game.ctx.lineWidth = 2;
    game.ctx.strokeStyle = '#000000';
    game.ctx.fillStyle = '#000000';
    game.ctx.arc(this.x, this.y, Portal.radius-this.width, 0, 2 * Math.PI, false);
    game.ctx.fill();
    game.ctx.stroke();
  }
}

