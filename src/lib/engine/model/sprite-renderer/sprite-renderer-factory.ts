import CanvasDisplay from '../display/canvas-display';
import { Display } from '../display/display';
import CircleSprite from '../sprite/canvas/circle-sprite';
import RectangleSprite from '../sprite/canvas/rectangle-sprite';
import Sprite from '../sprite/sprite';
import Transform from '../transform';
import CircleSpriteCanvasRenderer from './canvas/circle-sprite-canvas-renderer';
import RectangleSpriteCanvasRenderer from './canvas/rectangle-sprite-canvas-renderer';
import { SpriteRenderer } from './sprite-renderer';

export default class SpriteRendererFactory {

  private static singleton: SpriteRendererFactory;

  public static getInstance(): SpriteRendererFactory {
    if (this.singleton == null) this.singleton = new SpriteRendererFactory();

    return this.singleton;
  }

  public create(sprite: Sprite, display: Display, transform: Transform): SpriteRenderer {
    console.log(
      `[SpriteRendererFactory#create] sprite=${typeof sprite}, display=${typeof display}`
    );

    if (display instanceof CanvasDisplay) {
      if (sprite instanceof RectangleSprite)
        return new RectangleSpriteCanvasRenderer(sprite, display, transform);

      if (sprite instanceof CircleSprite)
        return new CircleSpriteCanvasRenderer(sprite, display, transform);
    }

    throw Error('Invalid argument combination');
  }
}
