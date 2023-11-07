import { Renderable } from '@/engine/interface/renderable.js';
import Scene from '@/engine/model/scene/scene.js';
import ResourceFactory from './resource-factory.js';
import Resource from './resource.js';
import Vector2 from '@/engine/model/vector2.js';
import Sprite from '@/engine/model/sprite/sprite.js';
import { SpriteRenderer } from '@/engine/model/sprite-renderer/sprite-renderer.js';
import Game from '@/engine/model/game/game.js';
import SpriteRendererFactory from '@/engine/model/sprite-renderer/sprite-renderer-factory.js';
import { Display } from '@/engine/model/display/display.js';
import EventSystem from '@/engine/event-system/event-system.js';
import { Topics } from '@/engine/event-system/topics.js';
import Subscription from '@/engine/event-system/subscription.js';
import Message from '@/engine/event-system/message.js';
import Bounds from '@/engine/model/bounds.js';

export default class ResourceSpawnEngine implements Renderable {

  private scene: Scene | null;
  private resourceFactory: ResourceFactory;
  private maxResources: number;

  public constructor(resourceFactory: ResourceFactory, maxResources: number) {
    this.resourceFactory = resourceFactory;
    this.maxResources = maxResources;
    this.scene = null;

    EventSystem.getInstance()
      .getTopic(Topics.ResourceCollected)
      ?.subscribe(new Subscription(
        'resource-spawn-engine',
        (msg: Message) => this.handleResourceCollected(msg.getId())
      ));
  }

  public handleResourceCollected(id: string): void {
    console.log(`[ResourceSpawnEngine#handleResourceCollected] ${id} collected. Deleting...`);
    // this.scene?.setResources(
    //   this.scene.getResources()
    //     .map((e) => (e.id == id) ? null : e)
    //     .filter((e): e is Exclude<typeof e, null> => (e != null))
    // );
  }

  public setScene(scene: Scene): void {
    this.scene = scene;
  }

  public update() {
    if (this.scene == null) return;

    const quantity = this.scene.getResources().length;
    if (quantity >= this.maxResources) return;

    const resource: Resource = this.createRandomResource();
    console.log(`
      [ResourceSpawnEngine] quantity=${quantity} -
      Adding 1 to (${resource.getTransform().position.x}, ${resource.getTransform().position.y})
    `.trim());

    const sprite: Sprite | null = resource.getSprite();

    if (sprite == null) return;

    const display: Display | null = Game.getInstance().getDisplay();

    if (display == null) return;

    const spriteRenderer: SpriteRenderer = SpriteRendererFactory.getInstance()
      .create(sprite, display, this.scene);

    resource.setSpriteRenderer(spriteRenderer);

    this.scene.getResources().push(resource);
  }

  private createRandomResource(): Resource {
    const randomPosition: Vector2 = this.createRandomPosition();

    const roll = this.getRandomInt(1, 3);

    switch(roll) {
    case 1:
      return this.resourceFactory.createPrometium(randomPosition);
    case 2:
      return this.resourceFactory.createEndurium(randomPosition);
    case 3:
      return this.resourceFactory.createTerbium(randomPosition);
    default:
      throw Error('Invalid roll');
    }
  }

  private createRandomPosition(): Vector2 {
    if (this.scene == null) throw Error('Scene must be present');

    const size: Vector2 = this.scene.getBounds().getSize();
    return new Vector2(
      this.getRandomInt(0, size.x),
      this.getRandomInt(0, size.y)
    );
  }

  private getRandomInt(start: number, end: number): number {
    return Math.floor(Math.random() * end) + start;
  }
}
