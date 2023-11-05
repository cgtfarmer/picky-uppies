import Transform from '../../../engine/model/transform';
import Resource from './resource';
import SpriteRendererFactory from '@/lib/engine/model/sprite-renderer/sprite-renderer-factory';
import Sprite from '@/lib/engine/model/sprite/sprite';
import CircleSprite from '@/lib/engine/model/sprite/canvas/circle-sprite';
import Vector2 from '@/lib/engine/model/vector2';
import Bounds from '@/lib/engine/model/bounds';
import Rng from '@/lib/engine/model/rng';

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

    switch(roll) {
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

    const sprite: Sprite = new CircleSprite(30, true, 2, '#ff0000', '#000000');

    const transform: Transform = new Transform(position);

    // const spriteRenderer: SpriteRenderer =
    //   this.spriteRendererFactory.create(sprite, display, transform);

    return new Resource(
      transform,
      sprite,
      'Prometium',
      10
    );
  }

  public createEndurium(position: Vector2): Resource {
    // const display: Display | null = Game.getInstance().getDisplay();

    // if (display == null) throw Error('Display must be present');

    const sprite: Sprite = new CircleSprite(30, true, 2, '#0000ff', '#000000');

    const transform: Transform = new Transform(position);

    // const spriteRenderer: SpriteRenderer =
    //   this.spriteRendererFactory.create(sprite, display, transform);

    return new Resource(
      transform,
      sprite,
      'Endurium',
      10
    );
  }

  public createTerbium(position: Vector2): Resource {
    // const display: Display | null = Game.getInstance().getDisplay();

    // if (display == null) throw Error('Display must be present');

    const sprite: Sprite = new CircleSprite(30, true, 2, '#ffff00', '#000000');

    const transform: Transform = new Transform(position);

    // const spriteRenderer: SpriteRenderer =
    //   this.spriteRendererFactory.create(sprite, display, transform);

    return new Resource(
      transform,
      sprite,
      'Endurium',
      10
    );
  }
}
