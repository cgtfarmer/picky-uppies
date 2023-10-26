import ElementAccessor from '../../accessor/element-accessor';
import GameFactory from '../factory/game-factory';
import { Renderable } from '../interface/renderable';
import CanvasDisplay from './display/canvas-display';
import Player from '../../game/model/character/player';
import Scene from './scene';

export default class Game implements Renderable {

  private static readonly TICK_IN_MILLISECONDS: number = 100;

  private static singleton: Game;

  private readonly canvas: CanvasDisplay;

  private readonly player: Player;

  private readonly scenes: Scene[];

  private activeScene: Scene;

  private running: boolean;

  private interval: number | null;

  public static getInstance(canvas: CanvasDisplay): Game {
    if (this.singleton == null) this.singleton =
      GameFactory.getInstance(canvas).createDefault();

    return this.singleton;
  }

  public constructor(canvas: CanvasDisplay, player: Player, scenes: Scene[]) {
    this.canvas = canvas;
    this.player = player;
    this.scenes = scenes;
    this.running = false;
    this.interval = null;

    if (this.scenes.length < 1) throw new Error('At least 1 Scene required');

    this.activeScene = scenes[0];
  }

  public update(): void {
    // console.log('[Game#update]');
    this.canvas.clearFrame();

    this.activeScene.update();
  }

  public start(): void {
    console.log(`[Game#start] running: ${this.running}`);
    if (this.running) return;

    this.interval = window.setInterval(() => {
      // console.log('[Game#tick]');
      // const container: Element | null = document.querySelector('#container');

      // if (container == null) return;

      const canvas = CanvasDisplay.getInstance();

      Game.getInstance(canvas).update();
    }, Game.TICK_IN_MILLISECONDS);

    this.running = true;
  }
}
