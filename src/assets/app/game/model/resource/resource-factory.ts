import Transform from '../../../engine/model/transform.js';
import Resource from './resource.js';
import CircleSprite from '@/engine/model/sprite/canvas/circle-sprite.js';
import Vector2 from '@/engine/model/vector2.js';
import Bounds from '@/engine/model/bounds.js';
import Rng from '@/engine/model/rng.js';
import CircleSpriteCanvasRenderer
  from '@/engine/model/sprite-renderer/canvas/circle-sprite-canvas-renderer.js';
import { SpriteRenderer } from '@/engine/model/sprite-renderer/sprite-renderer.js';
import Animator from '@/engine/model/animator/animator.js';

export default class ResourceFactory {

  private static singleton: ResourceFactory;

  // private readonly spriteRendererFactory: SpriteRendererFactory;

  public static getInstance(): ResourceFactory {
    if (this.singleton == null) {
      // const spriteRendererFactory = SpriteRendererFactory.getInstance();
      // this.singleton = new ResourceFactory(spriteRendererFactory);
      this.singleton = new ResourceFactory();
    }

    return this.singleton;
  }

  // public constructor(spriteRendererFactory: SpriteRendererFactory) {
  //   this.spriteRendererFactory = spriteRendererFactory;
  // }

  public createRandom(bounds: Bounds): Resource {
    const rng: Rng = Rng.getInstance();

    const roll = rng.getRandomInt(1, 3);

    switch (roll) {
    case 1:
      return this.createPrometium(bounds.getRandomPoint());
    case 2:
      return this.createEndurium(bounds.getRandomPoint());
    case 3:
      return this.createTerbium(bounds.getRandomPoint());
    default:
      throw Error('Invalid roll');
    }
  }

  public createPrometium(position: Vector2): Resource {
    // const display: Display | null = Game.getInstance().getDisplay();

    // if (display == null) throw Error('Display must be present');

    const sprite: CircleSprite =
      new CircleSprite(Vector2.zero(), 30, true, 2, '#ff0000', '#000000');

    const spriteRenderer: CircleSpriteCanvasRenderer = new CircleSpriteCanvasRenderer();

    const animator: Animator = new Animator(spriteRenderer, [sprite]);

    // const spriteRenderer: SpriteRenderer =
    //   this.spriteRendererFactory.create(sprite, display, transform);

    const resource: Resource = new Resource(
      animator,
      'Prometium',
      10
    );

    resource.getTransform().position = position;
    return resource;
  }

  public createEndurium(position: Vector2): Resource {
    // const display: Display | null = Game.getInstance().getDisplay();

    // if (display == null) throw Error('Display must be present');

    // const transform: Transform = new Transform(position);

    // const sprite: Sprite =
    // new CircleSprite(transform.position, 30, true, 2, '#0000ff', '#000000');

    // const spriteRenderer: SpriteRenderer =
    //   this.spriteRendererFactory.create(sprite, display, transform);

    const sprite: CircleSprite =
      new CircleSprite(Vector2.zero(), 30, true, 2, '#0000ff', '#000000');

    const spriteRenderer: CircleSpriteCanvasRenderer = new CircleSpriteCanvasRenderer();

    const animator: Animator = new Animator(spriteRenderer, [sprite]);

    const resource: Resource =  new Resource(
      animator,
      'Endurium',
      10
    );

    resource.getTransform().position = position;
    return resource;
  }

  public createTerbium(position: Vector2): Resource {
    // const display: Display | null = Game.getInstance().getDisplay();

    // if (display == null) throw Error('Display must be present');

    // const transform: Transform = new Transform(position);

    // const sprite: Sprite =
    // new CircleSprite(transform.position, 30, true, 2, '#ffff00', '#000000');

    // const spriteRenderer: SpriteRenderer =
    //   this.spriteRendererFactory.create(sprite, display, transform);

    const sprite: CircleSprite =
      new CircleSprite(Vector2.zero(), 30, true, 2, '#ffff00', '#000000');

    const spriteRenderer: CircleSpriteCanvasRenderer = new CircleSpriteCanvasRenderer();

    const animator: Animator = new Animator(spriteRenderer, [sprite]);

    const resource: Resource = new Resource(
      animator,
      'Terbium',
      10
    );

    resource.getTransform().position = position;
    return resource;
  }
}
