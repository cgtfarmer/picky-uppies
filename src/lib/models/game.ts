import GameFactory from '../factories/game-factory';
import Player from './player';
import Scene from './scene';

export default class Game {

  private static singleton: Game;

  private readonly container: Element;

  private readonly player: Player;

  private readonly scenes: Scene[];

  private activeScene: Scene;

  public static getInstance(container: Element): Game {
    if (this.singleton == null) this.singleton =
      GameFactory.getInstance().createDefault(container);

    return this.singleton;
  }

  public constructor(container: Element, player: Player, scenes: Scene[]) {
    this.container = container;
    this.player = player;
    this.scenes = scenes;

    if (this.scenes.length < 1) throw new Error('At least 1 Scene required');

    this.activeScene = scenes[0];

    this.initCanvas();
  }

  private initCanvas(): void {
    this.container.insertAdjacentHTML('beforeend', `
      <canvas id="canvas" width="1360" height="765" style="background-color: #888888;">
      </canvas>
    `);
  }
}
