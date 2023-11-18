import DomAccessor from '../../../dom/dom-accessor';
import GameFactory from './game-factory';
import { Renderable } from '../../interface/renderable';
import Player from '../../../game/model/character/player';
import Scene from '../scene/scene';
import { Display } from '../display/display';
import EventSystem from '../../event-system/event-system';

export default class Game implements Renderable {

  private static readonly TICK_IN_MILLISECONDS: number = 50; // 100;

  private static singleton: Game;

  private readonly eventSystem: EventSystem;

  private readonly scenes: Scene[];

  private player: Player | null;

  private display: Display | null;

  private activeScene: Scene;

  private running: boolean;

  private interval: number | null;

  public static getInstance(): Game {
    if (this.singleton == null) {
      this.singleton = GameFactory.getInstance().createDefault();
    }

    return this.singleton;
  }

  public constructor(eventSystem: EventSystem, scenes: Scene[]) {
    this.display = null;
    this.player = null;
    this.running = false;
    this.interval = null;
    this.eventSystem = eventSystem;
    this.scenes = scenes;

    if (this.scenes.length < 1) throw new Error('At least 1 Scene required');

    this.activeScene = scenes[0];
  }

  public getActiveScene(): Scene {
    return this.activeScene;
  }

  public getDisplay(): Display | null {
    return this.display;
  }

  public setDisplay(display: Display): void {
    this.display = display;

    this.scenes.forEach((scene) => scene.setDisplay(display));
  }

  public setPlayer(player: Player): void {
    this.player = player;

    this.getActiveScene().addRenderable(this.player);
  }

  public update(): void {
    if (this.display == null) throw Error('Display must be present');
    // console.log('[Game#update]');
    this.display.clearFrame();

    this.activeScene.update();
  }

  public start(): void {
    console.log(`[Game#start] running: ${this.running}`);
    if (this.running) return;

    if (this.display == null) throw Error('Display must be presetn');

    this.interval = window.setInterval(() => {
      // console.log('[Game#tick]');
      // const container: Element | null = document.querySelector('#container');

      // if (container == null) return;

      // const canvas = CanvasDisplay.getInstance();

      // Game.getInstance(canvas).update();
      Game.getInstance().update();
    }, Game.TICK_IN_MILLISECONDS);

    this.running = true;
  }
}
