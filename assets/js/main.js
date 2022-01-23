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
  const map5Options = {
    resources: {
      count: 0,
      selection: []
    },
    bonusBoxes: { count: 0 },
    enemies: { count: 0 }
  };

  game = new Game();

  const map1 = new GameMap('Map 1', Game.canvasWidth, Game.canvasHeight, map1Options);
  const map2 = new GameMap('Map 2', Game.canvasWidth, Game.canvasHeight, map2Options);
  const map3 = new GameMap('Map 3', Game.canvasWidth, Game.canvasHeight, map3Options);
  const map4 = new GameMap('Map 4', Game.canvasWidth, Game.canvasHeight, map4Options);
  const map5 = new GameMap('Map 5', Game.canvasWidth, Game.canvasHeight, map5Options);

  const portal1 = new Portal(Portal.mapCoordinates('bottomRight', map1));
  const portal2 = new Portal(Portal.mapCoordinates('topLeft', map2));
  const portal3 = new Portal(Portal.mapCoordinates('topRight', map2));
  const portal4 = new Portal(Portal.mapCoordinates('bottomRight', map2));
  const portal5 = new Portal(Portal.mapCoordinates('bottomLeft', map3));
  const portal6 = new Portal(Portal.mapCoordinates('topLeft', map4));
  const portal7 = new Portal(Portal.mapCoordinates('bottomRight', map3));
  const portal8 = new Portal(Portal.mapCoordinates('topRight', map4));
  const portal9 = new Portal(Portal.mapCoordinates('bottomRight', map4));
  const portal10 = new Portal(Portal.mapCoordinates('topLeft', map5));

  map1.addPortal(portal1);
  map2.addPortal(portal2);
  map2.addPortal(portal3);
  map2.addPortal(portal4);
  map3.addPortal(portal5);
  map3.addPortal(portal7);
  map4.addPortal(portal6);
  map4.addPortal(portal8);
  map4.addPortal(portal9);
  map5.addPortal(portal10);

  Portal.link(portal1, portal2);
  Portal.link(portal3, portal5);
  Portal.link(portal4, portal6);
  Portal.link(portal7, portal8);
  Portal.link(portal9, portal10);

  map5.portals[0].disabled = true;
  map5.portals[0].hidden = true;

  const boss = new Enemy((map5.width/2), (map5.height/2));
  boss.width = 100;
  boss.height = 100;
  boss.health = 500;
  boss.damage = 10;
  map5.enemies.push(boss);

  game.maps.push(map1, map2, map3, map4, map5);
  game.currentMap = map1;
  // game.currentMap = map5;
  game.player = new Player();
  game.store = new Store();
  game.start();
}

main();

