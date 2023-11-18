import BrowserInputModule from '../../../engine/model/input-module/browser-input-module.js';
import Inventory from '../inventory.js';
import Player from './player.js';
import RectangleSprite from '../../../engine/model/sprite/canvas/rectangle-sprite.js';
import Transform from '../../../engine/model/transform.js';
import { InputModule } from '../../../engine/model/input-module/input-module.js';
import Vector2 from '../../../engine/model/vector2.js';
import KeybindModule from '../../../engine/model/keybind-module/keybind-module.js';
import { Action } from '../../../engine/model/action/action.js';
import Interact from '../../../engine/model/action/interact.js';
import Bounds from '../../../engine/model/bounds.js';
import Animator from '../../../engine/model/animator/animator.js';
import RectangleSpriteCanvasRenderer
  from '../../../engine/model/sprite-renderer/canvas/rectangle-sprite-canvas-renderer.js';

export default class PlayerFactory {

  private static singleton: PlayerFactory;

  // private readonly spriteRendererFactory: SpriteRendererFactory;

  public static getInstance(): PlayerFactory {
    if (this.singleton == null) {
      // const spriteRendererFactory = SpriteRendererFactory.getInstance();
      // this.singleton = new PlayerFactory(spriteRendererFactory);
      this.singleton = new PlayerFactory();
    }

    return this.singleton;
  }

  // public constructor(spriteRendererFactory: SpriteRendererFactory) {
  //   this.spriteRendererFactory = spriteRendererFactory;
  // }

  public createDefault(): Player {
    // const game: Game = Game.getInstance();
    // const display: Display | null = game.getDisplay();

    // if (display == null) throw Error('Display must be present');

    // const sprite: RectangleSprite = new RectangleSprite(40, 40, true, 2, '#ff0000', '#000000');
    const bounds: Bounds = new Bounds(
      Vector2.zero(),
      new Vector2(40, 40)
    );

    const sprite: RectangleSprite = new RectangleSprite(bounds, true, 2, '#ffffff', '#000000');

    const spriteRenderer: RectangleSpriteCanvasRenderer = new RectangleSpriteCanvasRenderer();

    const animator: Animator = new Animator(spriteRenderer, [sprite]);

    const inventory: Inventory = new Inventory();

    // const spriteRenderer: SpriteRenderer =
    //   this.spriteRendererFactory.create(sprite, display, transform);
    // new RectangleSpriteCanvasRenderer(sprite, transform, this.canvas);

    const inputModule: InputModule = new BrowserInputModule();

    const keybindings: Map<string, Action> = new Map<string, Action>([
      [' ', new Interact(0, 55)],
    ]);
    const keybindModule: KeybindModule = new KeybindModule(inputModule, keybindings);

    const player: Player = new Player(
      animator,
      inputModule,
      'Player',
      100,
      100,
      0.5,
      1.0,
      0.05,
      0.5,
      100,
      inventory
    );

    player.setKeybindModule(keybindModule);
    return player;
  }
}
