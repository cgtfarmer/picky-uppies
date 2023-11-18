import { Renderable } from '../interface/renderable.js';
import Animator from './animator/animator.js';
import { Display } from './display/display.js';
import Scene from './scene/scene.js';
import Transform from './transform.js';
import UuidProvider from '../../../engine/uuid-provider.js';
import Vector2 from './vector2.js';

export default class GameObject implements Renderable {
  public readonly id: string;

  public enabled: boolean;

  protected readonly transform: Transform;

  protected scene: Scene | null;

  protected animator: Animator;

  public constructor(animator: Animator) {
    this.id = UuidProvider.getRandom();
    this.enabled = true;
    this.scene = null;
    this.transform = new Transform(Vector2.zero());
    this.animator = animator;
    this.animator.setGameObject(this);
  }

  public getScene(): Scene | null {
    return this.scene;
  }

  public getTransform(): Transform {
    return this.transform;
  }

  public setScene(scene: Scene): void {
    this.scene = scene;
  }

  public setDisplay(display: Display): void {
    this.animator?.setDisplay(display);
  }

  // public setSpriteRenderer(spriteRenderer: SpriteRenderer): void {
  //   this.spriteRenderer = spriteRenderer;
  //   this.spriteRenderer.setGameObject(this);
  // }

  public update(): void {
    throw Error('Implement override');
  }
}
