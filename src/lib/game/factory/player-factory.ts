import Display from '../../engine/model/display/canvas-display';
import BrowserInputModule from '../../engine/model/input-module/browser-input-module';
import Inventory from '../model/inventory';
import Player from '../model/character/player';
import RectangleSprite from '../../engine/model/sprite/canvas/rectangle-sprite';
import Transform from '../../engine/model/transform';
import { SpriteRenderer } from '@/lib/engine/model/sprite-renderer/sprite-renderer';
import { InputModule } from '@/lib/engine/model/input-module/input-module';
import SpriteRendererFactory from '@/lib/engine/model/sprite-renderer/sprite-renderer-factory';

export default class PlayerFactory {

  private static singleton: PlayerFactory;

  private readonly display: Display;

  private readonly spriteRendererFactory: SpriteRendererFactory;

  public static getInstance(display: Display): PlayerFactory {
    if (this.singleton == null) {
      this.singleton = new PlayerFactory(
        display,
        SpriteRendererFactory.getInstance()
      );
    }

    return this.singleton;
  }

  public constructor(display: Display, spriteRendererFactory: SpriteRendererFactory) {
    this.display = display;
    this.spriteRendererFactory = spriteRendererFactory;
  }

  public createDefault(): Player {
    const sprite: RectangleSprite = new RectangleSprite(40, 40, true, 2, '#ff0000', '#000000');

    const inventory: Inventory = new Inventory();

    const transform: Transform = new Transform(0, 0);

    const spriteRenderer: SpriteRenderer =
      this.spriteRendererFactory.create(sprite, this.display, transform);
      // new RectangleSpriteCanvasRenderer(sprite, transform, this.canvas);

    const inputModule: InputModule = new BrowserInputModule();

    return new Player(
      transform,
      sprite,
      spriteRenderer,
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
  }
}
