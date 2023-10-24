import GameFactory from '../factories/game-factory';
import Canvas from './canvas';
import Player from './player';
import Scene from './scene';

export default class Game {

  private static singleton: Game;

  private readonly canvas: Canvas;

  private readonly player: Player;

  private readonly scenes: Scene[];

  private activeScene: Scene;

  public static getInstance(canvas: Canvas): Game {
    if (this.singleton == null) this.singleton =
      GameFactory.getInstance().createDefault(canvas);

    return this.singleton;
  }

  public constructor(canvas: Canvas, player: Player, scenes: Scene[]) {
    this.canvas = canvas;
    this.player = player;
    this.scenes = scenes;

    if (this.scenes.length < 1) throw new Error('At least 1 Scene required');

    this.activeScene = scenes[0];
  }
}
