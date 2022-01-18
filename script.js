const canvas = document.querySelector('#canvas');
const debugText = document.querySelector('#debug-text');
const inventoryUi = document.querySelector('#inventory');
const storeUi = document.querySelector('#store');
const prometiumSellInput = document.querySelector('#prometium-sell-input');
const enduriumSellInput = document.querySelector('#endurium-sell-input');
const terbiumSellInput = document.querySelector('#terbium-sell-input');

const ctx = canvas.getContext('2d');
ctx.lineWidth = 0.5;
ctx.strokeStyle = '#000000';

const CANVAS_WIDTH = 16 * 90; // 1440
const CANVAS_HEIGHT = 9 * 90; // 810
const TICKER_INCREMENT = 100; // milliseconds

const RECT_WIDTH = 50;
const RECT_HEIGHT = 50;
const MAX_SPEED_X = 10;
const MAX_SPEED_Y = 10;

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

class Inventory {
  constructor() {
    this.credits = 0;
    this.uridium = 0;
    this.capacity = 100;
    this.size = 0;
    this.stash = {
      'Prometium': 0,
      'Endurium': 0,
      'Terbium': 0
    }
    this.creditsUi = document.querySelector('#credits');
    this.uridiumUi = document.querySelector('#uridium');
    this.prometiumUi = document.querySelector('#prometium');
    this.enduriumUi = document.querySelector('#endurium');
    this.terbiumUi = document.querySelector('#terbium');
  }

  addResource(name, count) {
    console.log(`addResource(${name}, ${count})`);
    if (!Object.keys(this.stash).includes(name)) {
      // Throw error
      console.log('ERROR: Invalid resource');
      return;
    }

    this.stash[name] += 1;
    this.size += count;
    this.updateUi();
  }

  removeResource() {
  }

  updateUi() {
    this.creditsUi.innerHTML = this.credits;
    this.uridiumUi.innerHTML = this.uridium;
    this.prometiumUi.innerHTML = this.stash['Prometium'];
    this.enduriumUi.innerHTML = this.stash['Endurium'];
    this.terbiumUi.innerHTML = this.stash['Terbium'];
  }

  toString() {
    let s = `
      capacity: ${this.capacity}
      size: ${this.size}
    `;

    for (let key of Object.keys(this.stash)) {
      s += `${key}: ${this.stash[key]}\n`;
    }

    return s.trim();
  }
}

let inventory = null;

let timer = null;

let keys = {};

let x = 50;
let y = 50;
let speedX = 0;
let speedY = 0;

class Resource {
  constructor(name, color, x, y) {
    this.name = name;
    this.color = color;
    this.x = x;
    this.y = y;
  }

  toString(x, y) {
    return `${this.name}(${this.x}, ${this.y})`;
  }
}

class Prometium extends Resource {
  constructor(x, y) {
    super('Prometium', 'red', x, y);
    this.value = 10;
    this.radius = 10;
  }
}

class Endurium extends Resource {
  constructor(x, y) {
    super('Endurium', 'blue', x, y);
    this.value = 15;
    this.radius = 10;
  }
}

class Terbium extends Resource {
  constructor(x, y) {
    super('Terbium', 'yellow', x, y);
    this.value = 20;
    this.radius = 10;
  }
}

// let myCar1 = new Car("Ford", 2014);

let resources = [
  new Prometium(200, 200),
  new Endurium(250, 70),
  new Terbium(50, 230)
];

let spaceHasBeenEvaluated = false;

function main() {
  render();
  inventory = new Inventory();
  inventory.updateUi();
  timer = window.setInterval(tick, TICKER_INCREMENT);
}

function tick() {
  updateSpeed();
  render();
}

function render() {
  x += speedX;
  y += speedY;
  updateDebugText();
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  for (let resource of resources) {
    ctx.beginPath();
    ctx.fillStyle = resource.color;
    ctx.arc(resource.x, resource.y, resource.radius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.rect(0, 0, BASE_WIDTH, BASE_HEIGHT);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.rect(x, y, RECT_WIDTH, RECT_HEIGHT);
  // ctx.fillRect(x, y, RECT_WIDTH, RECT_HEIGHT);
  ctx.fill();
  ctx.stroke();
}

function updateDebugText() {
  debugText.innerHTML = `
    # DEBUG
    canvas width: ${CANVAS_WIDTH}
    canvas height: ${CANVAS_HEIGHT}
    x: ${x}
    y: ${y}
    resources: ${resources}
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
  spaceHasBeenEvaluated = false;
}

function updateSpeed() {
  speedX = 0;
  speedY = 0;

  if (Object.keys(keys).length == 0) return;

  if (keys[A_KEY] || keys[LEFT_ARROW_KEY]) { speedX = MAX_SPEED_X * -1; }
  if (keys[D_KEY] || keys[RIGHT_ARROW_KEY]) { speedX = MAX_SPEED_X; }
  if (keys[W_KEY] || keys[UP_ARROW_KEY]) { speedY = MAX_SPEED_Y * -1; }
  if (keys[S_KEY] || keys[DOWN_ARROW_KEY]) { speedY = MAX_SPEED_Y; }
  if (keys[SPACEBAR_KEY]) {
    if (!spaceHasBeenEvaluated) {
      console.log('Registering spacebar');
       collectResource();
      spaceHasBeenEvaluated = true;
    } else {
      console.log('Not registering spacebar');
    }
  }
}

function collectResource() {
  if (inventory.size >= inventory.capacity) {
    // TODO: Show "inventory full" message
    return;
  }

  for (let i = 0; i < resources.length; i++) {
    const resource = resources[i];
    if (resourceInRange(resource)) {
      inventory.addResource(resource.name, 1)
      // TODO: Make this less stupid
      if (i == 0) {
        resources.shift();
      } else {
        resources.splice(i, i);
      }
    }
  }
}

function resourceInRange(resource) {
  if (
    (x < resource.x) &&
    (resource.x < (x + RECT_WIDTH)) &&
    (y < resource.y) &&
    (resource.y < (y + RECT_HEIGHT))
  ) {
    return true;
  } else {
    return false;
  }
}

function sell(resource) {
  switch(resource) {
    case 'prometium':
      if (prometiumSellInput.value <= inventory.stash['Prometium']) {
        inventory.stash['Prometium'] -= prometiumSellInput.value
        inventory.credits += prometiumSellInput.value * 10;
        prometiumSellInput.value = 0;
      } else {
        console.log('ERROR: Insufficient Prometium supply for this trade');
      }
      break;
    case 'endurium':
      if (enduriumSellInput.value <= inventory.stash['Endurium']) {
        inventory.stash['Endurium'] -= enduriumSellInput.value
        inventory.credits += enduriumSellInput.value * 10;
        enduriumSellInput.value = 0;
      } else {
        console.log('ERROR: Insufficient Endurium supply for this trade');
      }
      break;
    case 'terbium':
      if (terbiumSellInput.value <= inventory.stash['Terbium']) {
        inventory.stash['Terbium'] -= terbiumSellInput.value
        inventory.credits += terbiumSellInput.value * 10;
        terbiumSellInput.value = 0;
      } else {
        console.log('ERROR: Insufficient Terbium supply for this trade');
      }
      break;
    default:
      console.log('ERROR: Invalid max sell resource');
  }

  inventory.updateUi();
}

function maxSell(resource) {
  console.log(enduriumSellInput);
  switch(resource) {
    case 'prometium':
      prometiumSellInput.value = inventory.stash['Prometium'];
      break;
    case 'endurium':
      enduriumSellInput.value = inventory.stash['Endurium'];
      break;
    case 'terbium':
      terbiumSellInput.value = inventory.stash['Terbium'];
      break;
    default:
      console.log('ERROR: Invalid max sell resource');
  }
}

function stringifyHash(h) {
  let s = '';
  for (let key of Object.keys(h)) {
    s += `${key}: ${h[key]}\n`;
  }
  return s;
}

main();

