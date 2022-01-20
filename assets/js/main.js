const resourcesList = ['Prometium', 'Endurium', 'Terbium'];

// const inventoryUi = document.querySelector('#inventory');
// const storeUi = document.querySelector('#store');

let game = null;

function main() {
  console.log('[Main]');

  const map1Options = {
    base: {
      x: 0,
      y: 0
    },
    resources: {
      count: 10,
      selection: [0, 1, 2]
    },
    bonusBoxes: {
      count: 3
    }
  };

  game = new Game();
  const map1 = new GameMap(1440, 810, map1Options);
  game.maps.push(map1);
  game.currentMap = map1;
  game.player = new Player();
  game.store = new Store();
  game.start();
}

main();

