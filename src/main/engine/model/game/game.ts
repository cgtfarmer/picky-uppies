import GameFactory from './game-factory';
import { Renderable } from '../../interface/renderable';
import Player from '../../../game/model/character/player';
import Scene from '../scene/scene';
import { Display } from '../display/display';
import EventSystem from '../../event-system/event-system';
import Vector2 from '../vector2';
import SceneManager from '../scene/scene-manager';
import BrowserInputController from '../../../client/browser-game-client';
import { Action } from '../action/action';

export default class Game implements Renderable {

  private static readonly TICK_IN_MILLISECONDS: number = 50; // 100;

  private static singleton: Game;

  private readonly sceneManager: SceneManager;

  // private inputModule: BrowserInputController;

  // private eventSystem: EventSystem;

  private player: Player | null;

  private display: Display | null;

  private running: boolean;

  private interval: number | null;

  public static getInstance(): Game {
    if (this.singleton == null) {
      this.singleton = GameFactory.getInstance().createDefault();
    }

    return this.singleton;
  }

  public constructor() {
    this.running = false;
    this.interval = null;

    // this.eventSystem = new EventSystem();
    this.sceneManager = new SceneManager();
    // this.inputModule = new BrowserInputController();

    this.display = null;
    this.player = null;
  }

  public click(position: Vector2): void {
  }

  public getActiveScene(): Scene | null {
    return this.sceneManager.getActiveScene();
  }

  public getDisplay(): Display | null {
    return this.display;
  }

  public getDisplayTransformMatrix(): Vector2 | null {
    if (this.display == null) return null;

    return this.display.getTransformMatrix();
  }

  // public getInputModule(): BrowserInputController | null {
  //   return this.inputModule;
  // }

  public getPlayer(): Player | null {
    return this.player;
  }

  // public setEventSystem(eventSystem: EventSystem): void {
  //   this.eventSystem = eventSystem;
  // }

  public setDisplay(display: Display): void {
    this.display = display;

    this.sceneManager.setDisplay(display);

    // if (this.inputModule == null) return;

    // this.inputModule.setDisplay(display);
  }

  // public setInputModule(inputModule: BrowserInputController): void {
  //   this.inputModule = inputModule;
  // }

  public setPlayer(player: Player): void {
    this.player = player;
  }

  public getSceneManager(): SceneManager {
    return this.sceneManager;
  }

  public update(): void {
    // console.log('[Game#update]');
    if (this.display == null) throw Error('Display must be present');

    this.display.clearFrame();

    this.sceneManager.update();
  }

  public start(): void {
    console.log(`[Game#start] running: ${this.running}`);
    if (this.running) return;

    if (this.display == null) throw Error('Display must be present');

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
