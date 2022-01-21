const resourcesList = ['Prometium', 'Endurium', 'Terbium'];
const MILLISECONDS_PER_SECOND = 1000;

const experienceUi = document.querySelector('#experience');
const ammunitionUi = document.querySelector('#ammunition');
const targetUi = document.querySelector('#target');
const targetHpUi = document.querySelector('#target-hp');
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
    },
    enemies: {
      count: 5
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

