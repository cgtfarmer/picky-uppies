import Transform from '../../../engine/model/transform';
import Resource from './resource';
import SpriteRendererFactory from '@/lib/engine/model/sprite-renderer/sprite-renderer-factory';
import Sprite from '@/lib/engine/model/sprite/sprite';
import CircleSprite from '@/lib/engine/model/sprite/canvas/circle-sprite';
import Vector2 from '@/lib/engine/model/vector2';

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
