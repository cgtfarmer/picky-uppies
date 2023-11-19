import Bounds from '@/main/engine/model/bounds';
import CatchCounter from './catch-counter';
import Animator from '@/main/engine/model/animator/animator';
import TextSpriteCanvasRenderer
  from '@/main/engine/model/sprite-renderer/canvas/text-sprite-canvas-renderer';
import TextSprite from '@/main/engine/model/sprite/canvas/text-sprite';
import Vector2 from '@/main/engine/model/vector2';

export default class CatchCounterFactory {

  private static singleton: CatchCounterFactory;

  public static getInstance(): CatchCounterFactory {
    if (this.singleton != null) return this.singleton;

    this.singleton = new CatchCounterFactory();
    return this.singleton;
  }

  public createDefault(sceneBounds: Bounds): CatchCounter {
    const sceneBoundsMax: Vector2 = sceneBounds.getMax();

    const center: Vector2 = new Vector2((sceneBoundsMax.x - 84), (sceneBoundsMax.y - 100));

    const sprite: TextSprite = new TextSprite(
      center, '0 / 10', 84, 'Georgia', 'end', true, 0.5, '#ffffff', '#000000'
    );

    const spriteRenderer: TextSpriteCanvasRenderer = new TextSpriteCanvasRenderer();

    const animator: Animator = new Animator(spriteRenderer, [sprite]);

    const catchCounter: CatchCounter = new CatchCounter(animator, 10);

    catchCounter.setCustomId('catch-counter');
    return catchCounter;
  }
}
