class Portal {
  static radius = 50;
  static margin = 15;

  static link(portal1, portal2) {
    portal1.toPortal = portal2;
    portal2.toPortal = portal1;
  }

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

  constructor(coords) {
    console.log('[Portal] [Constructor]');
    // this.x = coords[0];
    // this.y = coords[1];
    // this.xAnchor = this.x;
    // this.yAnchor = this.y;
    // this.width = 20;
    this.map = null;
    this.toPortal = null;
    // this.color = '#bbbbbb';
    this.hidden = false;
    this.disabled = false;
    this.background = new Circle(
      coords[0],
      coords[1],
      Portal.radius,
      '#bbbbbb'
    );
    this.foreground = new Circle(
      coords[0],
      coords[1],
      Portal.radius - 20,
      '#000000'
    );
  }

  playerInRange() {
    let s = '[Portal] [Player In Range]';
    if (
      ((this.background.x - Portal.radius) < game.player.sprite.xAnchor) &&
      (game.player.sprite.xAnchor < (this.background.x + Portal.radius)) &&
      ((this.background.y - Portal.radius) < game.player.sprite.yAnchor) &&
      (game.player.sprite.yAnchor < (this.background.y + Portal.radius))
    ) {
      console.log(`${s} true`);
      return true;
    } else {
      console.log(`${s} false`);
      return false;
    }
  }

  jump() {
    if (this.disabled) return;

    console.log(`[Portal] [Jump] From: {${this.map.name}: (${this.background.x}, ${this.background.y})} To: {${this.toPortal.map.name}: (${this.toPortal.background.x}, ${this.toPortal.background.y})}`);
    game.player.cancelTarget();
    game.currentMap = this.toPortal.map;
    game.player.sprite.x = this.toPortal.background.x;
    game.player.sprite.y = this.toPortal.background.y;
  }

  render() {
    if (this.hidden) return;

    this.background.render();
    this.foreground.render();

    // game.ctx.beginPath();
    // game.ctx.lineWidth = 2;
    // game.ctx.strokeStyle = '#000000';
    // game.ctx.fillStyle = this.color;
    // game.ctx.arc(this.x, this.y, Portal.radius, 0, 2 * Math.PI, false);
    // game.ctx.fill();
    // game.ctx.stroke();

    // game.ctx.beginPath();
    // game.ctx.lineWidth = 2;
    // game.ctx.strokeStyle = '#000000';
    // game.ctx.fillStyle = '#000000';
    // game.ctx.arc(this.x, this.y, Portal.radius-this.width, 0, 2 * Math.PI, false);
    // game.ctx.fill();
    // game.ctx.stroke();
  }
}

