import ElementAccessor from '../../accessor/element-accessor';
import GameFactory from '../factory/game-factory';
import { Renderable } from '../interface/renderable';
import CanvasDisplay from './display/canvas-display';
import Player from '../../game/model/character/player';
import Scene from './scene';
import Display from './display/display';

export default class Game implements Renderable {

  private static readonly TICK_IN_MILLISECONDS: number = 100;

  private static singleton: Game;

  private readonly display: Display;

  private readonly player: Player;

  private readonly scenes: Scene[];

  private activeScene: Scene;

  private running: boolean;

  private interval: number | null;

  public static getInstance(display: Display): Game {
    if (this.singleton == null) this.singleton =
      GameFactory.getInstance(display).createDefault();

    return this.singleton;
  }

  public constructor(display: Display, player: Player, scenes: Scene[]) {
    this.display = display;
    this.player = player;
    this.scenes = scenes;
    this.running = false;
    this.interval = null;

    if (this.scenes.length < 1) throw new Error('At least 1 Scene required');

    this.activeScene = scenes[0];
  }

  public getActiveScene(): Scene {
    return this.activeScene;
  }

  public update(): void {
    // console.log('[Game#update]');
    this.display.clearFrame();

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
