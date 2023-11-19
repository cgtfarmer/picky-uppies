import BrowserInputModule from '../../../engine/model/input-module/browser-input-module';
import Inventory from '../inventory';
import Player from './player';
import RectangleSprite from '../../../engine/model/sprite/canvas/rectangle-sprite';
import Transform from '../../../engine/model/transform';
import { InputModule } from '@/main/engine/model/input-module/input-module';
import Vector2 from '@/main/engine/model/vector2';
import KeybindModule from '@/main/engine/model/keybind-module/keybind-module';
import { Action } from '@/main/engine/model/action/action';
import Interact from '@/main/engine/model/action/interact';
import Bounds from '@/main/engine/model/bounds';
import Animator from '@/main/engine/model/animator/animator';
import RectangleSpriteCanvasRenderer
  from '@/main/engine/model/sprite-renderer/canvas/rectangle-sprite-canvas-renderer';
import { RigidBody } from '@/main/engine/model/rigid-body/rigid-body';
import RigidBody2d from '@/main/engine/model/rigid-body/rigid-body-2d';

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

    const rigidBody: RigidBody = new RigidBody2d();

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

    player.setRigidBody(rigidBody);
    player.setKeybindModule(keybindModule);
    return player;
  }
}
