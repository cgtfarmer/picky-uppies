import RectangleSprite from '../../engine/model/sprite/canvas/rectangle-sprite';
import Transform from '../../engine/model/transform';
import { SpriteRenderer } from '@/lib/engine/model/sprite-renderer/sprite-renderer';
import Resource from '../model/resource/resource';
import Display from '@/lib/engine/model/display/display';
import SpriteRendererFactory from '@/lib/engine/model/sprite-renderer/sprite-renderer-factory';
import Sprite from '@/lib/engine/model/sprite/sprite';
import CircleSprite from '@/lib/engine/model/sprite/canvas/circle-sprite';

export default class ResourceFactory {

  private static singleton: ResourceFactory;

  private readonly display: Display;

  private readonly spriteRendererFactory: SpriteRendererFactory;

  public static getInstance(display: Display): ResourceFactory {
    if (this.singleton == null) {
      this.singleton = new ResourceFactory(display, SpriteRendererFactory.getInstance());
    }

    return this.singleton;
  }

  public constructor(display: Display, spriteRendererFactory: SpriteRendererFactory) {
    this.display = display;
    this.spriteRendererFactory = spriteRendererFactory;
  }

  public createPrometium(x: number, y: number): Resource {
    const sprite: Sprite = new CircleSprite(30, true, 2, '#ff0000', '#000000');

    const transform: Transform = new Transform(x, y);

    const spriteRenderer: SpriteRenderer =
      this.spriteRendererFactory.create(sprite, this.display, transform);

    return new Resource(
      transform,
      sprite,
      spriteRenderer,
      'Prometium',
      10
    );
  }

  public createEndurium(x: number, y: number): Resource {
    const sprite: Sprite = new CircleSprite(30, true, 2, '#0000ff', '#000000');

    const transform: Transform = new Transform(x, y);

    const spriteRenderer: SpriteRenderer =
      this.spriteRendererFactory.create(sprite, this.display, transform);

    return new Resource(
      transform,
      sprite,
      spriteRenderer,
      'Endurium',
      10
    );
  }

  public createTerbium(x: number, y: number): Resource {
    const sprite: Sprite = new CircleSprite(30, true, 2, '#ffff00', '#000000');

    const transform: Transform = new Transform(x, y);

    const spriteRenderer: SpriteRenderer =
      this.spriteRendererFactory.create(sprite, this.display, transform);

    return new Resource(
      transform,
      sprite,
      spriteRenderer,
      'Endurium',
      10
    );
  }
}
