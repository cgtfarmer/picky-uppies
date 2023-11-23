import GameFactory from './game-factory';
import { Renderable } from '../../interface/renderable';
import Player from '../../../game/model/character/player';
import Scene from '../scene/scene';
import { Display } from '../display/display';
import EventSystem from '../../event-system/event-system';
import Vector2 from '../vector2';
import SceneManager from '../scene/scene-manager';
import KeybindModule from '../keybind-module/keybind-module';

export default class Game implements Renderable {

  private static readonly TICK_IN_MILLISECONDS: number = 50; // 100;

  private static singleton: Game;

  private readonly sceneManager: SceneManager;

  private eventSystem: EventSystem | null;

  private player: Player | null;

  private display: Display | null;

  private running: boolean;

  private interval: number | null;

  private keybindModule: KeybindModule | null;

  public static getInstance(): Game {
    if (this.singleton == null) {
      this.singleton = GameFactory.getInstance().createDefault();
    }

    return this.singleton;
  }

  public constructor() {
    this.running = false;
    this.interval = null;

    this.eventSystem = null;
    this.sceneManager = new SceneManager(this);
    this.keybindModule = null;

    this.display = null;
    this.player = null;
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

  public getKeybindModule(): KeybindModule | null {
    return this.keybindModule;
  }

  public getPlayer(): Player | null {
    return this.player;
  }

  public setEventSystem(eventSystem: EventSystem): void {
    this.eventSystem = eventSystem;
  }

  public setDisplay(display: Display): void {
    this.display = display;

    this.sceneManager.setDisplay(display);

    if (this.keybindModule == null) return;

    this.keybindModule.setDisplay(display);
  }

  public setKeybindModule(keybindModule: KeybindModule): void {
    this.keybindModule = keybindModule;
  }

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
