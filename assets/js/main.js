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

const BASE_WIDTH = 75;
const BASE_HEIGHT = 75;

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
let inventory = null;
let store = null;
let timer = null;
let keys = {};

let spaceHasBeenEvaluated = false;

function main() {
  map = new Map(1440, 810);
  player = new Player();
  inventory = new Inventory();
  store = new Store();
  render();
  timer = window.setInterval(tick, TICKER_INCREMENT);
}

function tick() {
  updateSpeed();
  render();
}

function render() {
  player.x += player.speedX;
  player.y += player.speedY;
  updateDebugText();
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.rect(0, 0, BASE_WIDTH, BASE_HEIGHT);
  ctx.fill();
  ctx.stroke();

  for (let resource of resources) {
    ctx.beginPath();
    ctx.fillStyle = resource.color;
    ctx.arc(resource.x, resource.y, resource.radius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.rect(player.x, player.y, player.width, player.height);
  ctx.fill();
  ctx.stroke();
}

function updateDebugText() {
  debugText.innerHTML = `
    # DEBUG
    canvas width: ${CANVAS_WIDTH}
    canvas height: ${CANVAS_HEIGHT}
    x: ${player.x}
    y: ${player.y}
    resources: (${resources.length}) ${resources}
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

function updateSpeed() {
  player.speedX = 0;
  player.speedY = 0;

  if (Object.keys(keys).length == 0) return;

  if (keys[A_KEY] || keys[LEFT_ARROW_KEY]) { player.speedX = player.maxSpeedX * -1; }
  if (keys[D_KEY] || keys[RIGHT_ARROW_KEY]) { player.speedX = player.maxSpeedX; }
  if (keys[W_KEY] || keys[UP_ARROW_KEY]) { player.speedY = player.maxSpeedY * -1; }
  if (keys[S_KEY] || keys[DOWN_ARROW_KEY]) { player.speedY = player.maxSpeedY; }
  if (keys[SPACEBAR_KEY]) {
    if (!spaceHasBeenEvaluated) {
      console.log('Registering spacebar');
      if (player.collectResource()) {
        generateRandomResource();
      }
      spaceHasBeenEvaluated = true;
    } else {
      console.log('Not registering spacebar');
    }
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1) + min);
}

main();

