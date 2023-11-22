import DomAccessor from '@/main/dom/dom-accessor';
import CanvasDisplay from '../display/canvas-display';
import { InputModule } from './input-module';
import Game from '../game/game';
import Vector2 from '../vector2';
import GameObject from '../game-object';
import Physics2D from '../physics-2d';
import UiElement from '../ui-element/ui-element';
import { Display } from '../display/display';
import Scene from '../scene/scene';

export default class BrowserInputModule implements InputModule {

  private readonly game: Game;
  private canvas: HTMLCanvasElement | null;
  private xAxis: number;
  private yAxis: number;

  // private static keys: Map<string, boolean> = new Map<string, boolean>();
  private keys: Map<string, boolean>;

  public constructor(game: Game) {
    this.game = game;
    this.xAxis = 0;
    this.yAxis = 0;
    this.keys = new Map<string, boolean>();
    this.canvas = null;

    window.addEventListener('keydown', (event) => {
      event.preventDefault();
      this.registerKey(event.key);
    });

    window.addEventListener('keyup', (event) => {
      event.preventDefault();
      this.unregisterKey(event.key);
    });
  }

  public setDisplay(display: Display): void {
    const canvasDisplay: CanvasDisplay = display as CanvasDisplay;
    this.canvas = canvasDisplay.getHtmlCanvasElement();

    window.addEventListener('mousedown', (event) => {
      console.log('[BrowserInputModule#mousedown-event]');

      if (this.canvas == null) return;

      const rect: DOMRect = this.canvas.getBoundingClientRect();

      const activeScene: Scene | null = this.game.getActiveScene();

      if (!activeScene) return;

      const activeSceneExtents: Vector2 = activeScene.getBounds().getExtents();
      const clickPosition: Vector2 = new Vector2(
        (event.clientX - (rect.left + activeSceneExtents.x)),
        (event.clientY - (rect.top + activeSceneExtents.y))
      );

      console.log(`[BrowserInputModule#mousedown-event] clickPosition=${clickPosition}`);

      const uiElements: GameObject[] = activeScene.getUiElements();

      // TODO: This is so bad and janky, please fix yesterday
      const results: UiElement[] = Physics2D.getInstance()
        .overlapCircle(clickPosition, 100, uiElements) as UiElement[];

      results.forEach((e) => e.onClick());
    });
  }

  public registerKey(key: string): void {
    // console.log(`[InputModule#registerKey] key=${key}`);

    this.keys.set(key, true);
  }

  public unregisterKey(key: string): void {
    // console.log(`[InputModule#unregisterKey] key=${key}`);

    this.keys.delete(key);
  }

  public getXAxis(): number {
    let value = 0;

    if (this.keys.has('a') || this.keys.has('ArrowLeft')) {
      value = -1;
    }

    if (this.keys.has('d') || this.keys.has('ArrowRight')) {
      value += 1;
    }

    // if (InputModule.keys.has('a')) value = -1;

    // if (InputModule.keys.has('d')) value += 1;

    return value;
  }

  public getYAxis(): number {
    let value = 0;

    if (this.keys.has('s') || this.keys.has('ArrowDown')) {
      value = -1;
    }

    if (this.keys.has('w') || this.keys.has('ArrowUp')) {
      value += 1;
    }

    // if (InputModule.keys.has('s')) value = -1;

    // if (InputModule.keys.has('w')) value += 1;

    return value;
  }

  public keyIsDown(key: string): boolean {
    return this.keys.has(key);
  }

  public getActiveKeys(): string[] {
    return Array.from(this.keys.keys());
  }

  // private registerKey(event: KeyboardEvent): void {
  //   event.preventDefault();
  //   console.log(`[InputModule#registerKey] ${event.type}, ${event.key}, ${event.repeat}`);

  //   InputModule.keys.set(event.key, true);
  // }

  // private unregisterKey(event: KeyboardEvent): void {
  //   event.preventDefault();
  //   console.log(`[InputModule#unregisterKey] ${event.type}, ${event.key}, ${event.repeat}`);

  //   InputModule.keys.delete(event.key);
  // }

  // private handleKeypress(event: KeyboardEvent): void {
  //   event.preventDefault();
  //   // console.log(event.type);
  //   // console.log(event.code);
  //   console.log(`[InputModule#handleKeypress] ${event.type}, ${event.key}, ${event.repeat}`);

  //   InputModule.keys = new Map<string, boolean>();

  //   // if (event.type == 'keyup') this.keys.delete(event.code);
  //   // if (event.type == 'keyup') {
  //   //   InputModule.keys.delete(event.key);
  //   //   return;
  //   // }

  //   // this.keys.set(event.code, true);
  //   InputModule.keys.set(event.key, true);
  // }
}
