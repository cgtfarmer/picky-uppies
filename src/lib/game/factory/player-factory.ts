import CanvasDisplay from '../../engine/model/display/canvas-display';
import InputModule from '../../engine/model/input-module';
import Inventory from '../models/inventory';
import Player from '../models/player';
import RectangleSprite from '../../engine/model/sprite/canvas/rectangle-sprite';
import Sprite from '../../engine/model/sprite/sprite';
import RectangleSpriteCanvasRenderer from '../../engine/model/sprite-renderer/canvas/rectangle-sprite-canvas-renderer';
import Transform from '../../engine/model/transform';

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
    const sprite: Sprite = new RectangleSprite(40, 40, 2, '#000000', '#ff0000', true);

    const inventory: Inventory = new Inventory();

    const transform: Transform = new Transform(0, 0);

    const spriteRenderer: RectangleSpriteCanvasRenderer = new RectangleSpriteCanvasRenderer(
      sprite, transform, this.canvas.getContext()
    );

    const inputModule: InputModule = new InputModule();

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
