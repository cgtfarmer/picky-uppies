import CanvasDisplay from '../../engine/model/display/canvas-display';
import BrowserInputModule from '../../engine/model/input-module/browser-input-module';
import Inventory from '../models/inventory';
import Player from '../models/player';
import RectangleSprite from '../../engine/model/sprite/canvas/rectangle-sprite';
import RectangleSpriteCanvasRenderer
  from '../../engine/model/sprite-renderer/canvas/rectangle-sprite-canvas-renderer';
import Transform from '../../engine/model/transform';
import { SpriteRenderer } from '@/lib/engine/model/sprite-renderer/sprite-renderer';
import { InputModule } from '@/lib/engine/model/input-module/input-module';

export default class PlayerFactory {

  private static singleton: PlayerFactory;

  private readonly canvas: CanvasDisplay;

  public static getInstance(canvas: CanvasDisplay): PlayerFactory {
    if (this.singleton == null) this.singleton = new PlayerFactory(canvas);

    return this.singleton;
  }

  public constructor(canvas: CanvasDisplay) {
    this.canvas = canvas;
  }

  public createDefault(): Player {
    const sprite: RectangleSprite = new RectangleSprite(40, 40, true, 2, '#ff0000', '#000000');

    const inventory: Inventory = new Inventory();

    const transform: Transform = new Transform(0, 0);

    const spriteRenderer: SpriteRenderer =
      new RectangleSpriteCanvasRenderer(sprite, transform, this.canvas);

    const inputModule: InputModule = new BrowserInputModule();

    return new Player(
      'Player',
      100,
      100,
      0.5,
      1.0,
      0.05,
      0.5,
      100,
      transform,
      sprite,
      spriteRenderer,
      inputModule,
      inventory
    );
  }
}
