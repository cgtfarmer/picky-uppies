Game.canvas.width = Game.canvasWidth;
Game.canvas.height = Game.canvasHeight;

const resourcesList = ['Prometium', 'Endurium', 'Terbium'];
const MILLISECONDS_PER_SECOND = 1000;
// const successMsgUi = document.querySelector('#success-msg');

const ammunitionUi = document.querySelector('#ammunition');
// const inventoryUi = document.querySelector('#inventory');
// const storeUi = document.querySelector('#store');

let game = null;

function main() {
  console.log('[Main]');

  const map1Options = {
    base: { x: 0, y: 0 },
    resources: {
      count: 10,
      selection: [0]
    },
    bonusBoxes: { count: 1 },
    enemies: { count: 2 }
  };
  const map2Options = {
    resources: {
      count: 15,
      selection: [0, 1]
    },
    bonusBoxes: { count: 3 },
    enemies: { count: 3 }
  };
  const map3Options = {
    resources: {
      count: 20,
      selection: [0, 1, 2]
    },
    bonusBoxes: { count: 5 },
    enemies: { count: 5 }
  };
  const map4Options = {
    resources: {
      count: 30,
      selection: [1, 2]
    },
    bonusBoxes: { count: 7 },
    enemies: { count: 10 }
  };

  game = new Game();
  const map1 = new GameMap(Game.canvasWidth, Game.canvasHeight, map1Options);
  const map2 = new GameMap(Game.canvasWidth, Game.canvasHeight, map2Options);
  const map3 = new GameMap(Game.canvasWidth, Game.canvasHeight, map3Options);
  const map4 = new GameMap(Game.canvasWidth, Game.canvasHeight, map4Options);

  const portal1 = new Portal(Portal.mapCoordinates('bottomRight', map1), map2);
  const portal2 = new Portal(Portal.mapCoordinates('topLeft', map2), map1);
  const portal3 = new Portal(Portal.mapCoordinates('topRight', map2), map3);
  const portal4 = new Portal(Portal.mapCoordinates('bottomRight', map2), map4);
  const portal5 = new Portal(Portal.mapCoordinates('bottomLeft', map3), map2);
  const portal6 = new Portal(Portal.mapCoordinates('topLeft', map4), map2);
  portal1.toX = portal2.x;
  portal1.toY = portal2.y;
  portal2.toX = portal1.x;
  portal2.toY = portal1.y;
  portal3.toX = portal5.x;
  portal3.toY = portal5.y;
  portal4.toX = portal6.x;
  portal4.toY = portal6.y;
  portal5.toX = portal3.x;
  portal5.toY = portal3.y;
  portal6.toX = portal4.x;
  portal6.toY = portal4.y;

  map1.portals.push(portal1);
  map2.portals.push(portal2);
  map2.portals.push(portal3);
  map2.portals.push(portal4);
  map3.portals.push(portal5);
  map4.portals.push(portal6);

  game.maps.push(map1, map2, map3, map4);
  game.currentMap = map1;
  game.player = new Player();
  game.store = new Store();
  game.start();
}

main();

