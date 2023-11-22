import Animator from '@/main/engine/model/animator/animator';
import TextSpriteCanvasRenderer
  from '@/main/engine/model/sprite-renderer/canvas/text-sprite-canvas-renderer';
import TextSprite from '@/main/engine/model/sprite/canvas/text-sprite';
import Vector2 from '@/main/engine/model/vector2';
import StopWatch from './stop-watch';
import Bounds from '@/main/engine/model/bounds';

export default class StopWatchFactory {

  private static singleton: StopWatchFactory;

  public static getInstance(): StopWatchFactory {
    if (this.singleton != null) return this.singleton;

    this.singleton = new StopWatchFactory();
    return this.singleton;
  }

  public createDefault(sceneBounds: Bounds): StopWatch {
    const sceneBoundsMax: Vector2 = sceneBounds.getMax();

    const center: Vector2 = new Vector2(0, (sceneBoundsMax.y - 100));

    const sprite: TextSprite = new TextSprite(
      center, '00:00:00', 84, 'Georgia', 'center', true, 0.5, '#ffffff', '#000000'
    );

    const spriteRenderer: TextSpriteCanvasRenderer = new TextSpriteCanvasRenderer();

    const animator: Animator = new Animator(spriteRenderer, [sprite]);

    const stopWatch: StopWatch = new StopWatch(animator);

    stopWatch.setCustomId('stop-watch');
    stopWatch.getTransform().position = center;
    return stopWatch;
  }
}
