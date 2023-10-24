import Player from './player';
import Rectangle from './rectangle';
import Sprite from './sprite';

export default class Game {

  private static singleton: Game;

  private player: Player;

  private containerId: string;
  private canvasId: string;

  public static getInstance(containerId: string): Game {
    if (this.singleton == null) this.singleton = new Game(containerId);

    return this.singleton;
  }

  public constructor(containerId: string) {
    this.containerId = containerId;
    this.canvasId = 'canvas';

    console.log(`Meow? ${this.containerId}`);

    const playerSprite: Sprite = new Rectangle(0, 0, 40, 40, '#ff0000');
    this.player = new Player(
      'Player',
      100,
      100,
      0.5,
      1.0,
      0.05,
      0.5,
      100,
      playerSprite
    );

    const container: Element | null = document.querySelector(`#${this.containerId}`);

    if (!container) return;

    container.insertAdjacentHTML('beforeend', `
      <canvas id="${this.canvasId}" width="1360" height="765" style="background-color: #888888;">
      </canvas>
    `);
  }
}
