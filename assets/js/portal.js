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
    this.radius = 50;
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
    console.log('[Portal] [Player In Range]');

    return Game.pointInArea(
      [game.player.sprite.xAnchor, game.player.sprite.yAnchor],
      [(this.sprite.x), (this.sprite.x + this.sprite.radius)],
      [(this.sprite.y), (this.sprite.y + this.sprite.radius)]
    );
  }

  jump() {
    if (this.disabled) return;

    // console.log(`[Portal] [Jump] From: {${this.map.name}: (${this.background.x}, ${this.background.y})} To: {${this.toPortal.map.name}: (${this.toPortal.background.x}, ${this.toPortal.background.y})}`);
    game.player.cancelTarget();
    game.currentMap = this.toPortal.map;
    game.player.sprite.x = this.toPortal.background.x;
    game.player.sprite.y = this.toPortal.background.y;
  }

  render() {
    if (this.hidden) return;

    this.background.render();
    this.foreground.render();
  }
}

