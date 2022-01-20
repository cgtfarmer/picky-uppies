const canvas = document.querySelector('#canvas');
const debugText = document.querySelector('#debug-text');
const inventoryUi = document.querySelector('#inventory');
const storeUi = document.querySelector('#store');

const ctx = canvas.getContext('2d');
ctx.lineWidth = 0.5;
ctx.strokeStyle = '#000000';

const CANVAS_WIDTH = 16 * 90; // 1440
const CANVAS_HEIGHT = 9 * 90; // 810
const TICKER_INCREMENT = 100; // milliseconds

const KEYDOWN_EVENT = 'keydown';
const LEFT_ARROW_KEY = 37;
const RIGHT_ARROW_KEY = 39;
const UP_ARROW_KEY = 38;
const DOWN_ARROW_KEY = 40;
const W_KEY = 87;
const A_KEY = 65;
const S_KEY = 83;
const D_KEY = 68;
const SPACEBAR_KEY = 32;

const LISTENING_KEYS = [
  LEFT_ARROW_KEY,
  RIGHT_ARROW_KEY,
  UP_ARROW_KEY,
  DOWN_ARROW_KEY,
  SPACEBAR_KEY
];

let player = null;
let store = null;
let timer = null;
let keys = {};

let spaceHasBeenEvaluated = false;

const resourcesList = ['Prometium', 'Endurium', 'Terbium'];

let currentMap = null;

function main() {
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
  const map1 = new GameMap(1440, 810, map1Options);
  currentMap = map1;
  player = new Player();
  store = new Store();
  renderFrame();
  timer = window.setInterval(tick, TICKER_INCREMENT);
}

function tick() {
  player.speedX = 0;
  player.speedY = 0;
  performKeyActions();
  player.x += player.speedX;
  player.y += player.speedY;
  renderFrame();
  // updateDebugText();
}

function renderFrame() {
  clearFrame();

  currentMap.render();

  player.render();
}

function clearFrame() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function updateDebugText() {
  debugText.innerHTML = `
    # DEBUG
    canvas width: ${CANVAS_WIDTH}
    canvas height: ${CANVAS_HEIGHT}
    x: ${player.x}
    y: ${player.y}
    resources: (${currentMap.resources.length}) ${currentMap.resources}
    bonusBoxes: (${currentMap.bonusBoxes.length}) ${currentMap.bonusBoxes}
    ammunition: ${player.inventory.stash['Ammunition']}
  `;
}

function registerKey(event) {
  // Don't register if opposite key is currently registered?
  keyCode = event.keyCode;
  // console.log(keyCode);
  if (LISTENING_KEYS.includes(keyCode)) {
    event.preventDefault();
  }

  keys[keyCode] = (event.type == KEYDOWN_EVENT);
}

function unregisterKey(event) {
  keys[event.keyCode] = (event.type == KEYDOWN_EVENT);
  // Does this need to check specifically for spacebar key?
  // if (event.keyCode == SPACEBAR_KEY)
  spaceHasBeenEvaluated = false;
}

function performKeyActions() {
  if (Object.keys(keys).length == 0) return;

  if (keys[A_KEY] || keys[LEFT_ARROW_KEY]) { player.speedX = player.maxSpeedX * -1; }
  if (keys[D_KEY] || keys[RIGHT_ARROW_KEY]) { player.speedX = player.maxSpeedX; }
  if (keys[W_KEY] || keys[UP_ARROW_KEY]) { player.speedY = player.maxSpeedY * -1; }
  if (keys[S_KEY] || keys[DOWN_ARROW_KEY]) { player.speedY = player.maxSpeedY; }
  if (keys[SPACEBAR_KEY]) {
    if (!spaceHasBeenEvaluated) {
      console.log('Registering spacebar');
      const results = player.collect();
      if (results == -1) return;

      if (results['type'] == 'resource') {
        currentMap.resources.splice(results['index'], 1);
        currentMap.generateRandomResource();
      } else if (results['type'] == 'bonusBox') {
        currentMap.bonusBoxes.splice(results['index'], 1);
        currentMap.generateRandomBonusBox();
      }

      spaceHasBeenEvaluated = true;
    } else {
      console.log('Not registering spacebar');
    }
  }
}

main();

