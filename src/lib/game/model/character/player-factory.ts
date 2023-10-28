import BrowserInputModule from '../../../engine/model/input-module/browser-input-module';
import Inventory from '../inventory';
import Player from './player';
import RectangleSprite from '../../../engine/model/sprite/canvas/rectangle-sprite';
import Transform from '../../../engine/model/transform';
import { SpriteRenderer } from '@/lib/engine/model/sprite-renderer/sprite-renderer';
import { InputModule } from '@/lib/engine/model/input-module/input-module';
import SpriteRendererFactory from '@/lib/engine/model/sprite-renderer/sprite-renderer-factory';
import Vector2 from '@/lib/engine/model/vector2';
import KeybindModule from '@/lib/engine/model/keybind-module/keybind-module';
import { Action } from '@/lib/engine/model/action/action';
import Interact from '@/lib/engine/model/action/interact';
import Game from '@/lib/engine/model/game/game';

export default class PlayerFactory {

  private static singleton: PlayerFactory;

  private readonly spriteRendererFactory: SpriteRendererFactory;

  public static getInstance(): PlayerFactory {
    if (this.singleton == null) {
      const spriteRendererFactory = SpriteRendererFactory.getInstance();
      this.singleton = new PlayerFactory(spriteRendererFactory);
    }

    return this.singleton;
  }

  public constructor(spriteRendererFactory: SpriteRendererFactory) {
    this.spriteRendererFactory = spriteRendererFactory;
  }

  public createDefault(): Player {
    // const game: Game = Game.getInstance();
    // const display: Display | null = game.getDisplay();

    // if (display == null) throw Error('Display must be present');

    const sprite: RectangleSprite = new RectangleSprite(40, 40, true, 2, '#ff0000', '#000000');

    const inventory: Inventory = new Inventory();

    const transform: Transform = new Transform(new Vector2(0, 0));

    // const spriteRenderer: SpriteRenderer =
    //   this.spriteRendererFactory.create(sprite, display, transform);
    // new RectangleSpriteCanvasRenderer(sprite, transform, this.canvas);

    const inputModule: InputModule = new BrowserInputModule();

    const keybindings: Map<string, Action> = new Map<string, Action>([
      ['Space', new Interact(0, 20)],
    ]);
    const keybindModule: KeybindModule = new KeybindModule(inputModule, keybindings);

    const player: Player = new Player(
      transform,
      sprite,
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
