import { Renderable } from '../interface/renderable';
import Animator from './animator/animator';
import { Display } from './display/display';
import Scene from './scene/scene';
import Transform from './transform';
import UuidProvider from '@/main/engine/uuid-provider';
import Vector2 from './vector2';
import { RigidBody } from './rigid-body/rigid-body';

export default class GameObject implements Renderable {

  public readonly id: string;

  public enabled: boolean;

  protected readonly transform: Transform;

  protected scene: Scene | null;

  protected animator: Animator;

  protected rigidBody: RigidBody | null;

  public constructor(animator: Animator) {
    this.id = UuidProvider.getRandom();
    this.enabled = true;
    this.scene = null;
    this.transform = new Transform(Vector2.zero());
    this.animator = animator;
    this.animator.setGameObject(this);
    this.rigidBody = null;
  }

  public getScene(): Scene | null {
    return this.scene;
  }

  public getTransform(): Transform {
    return this.transform;
  }

  public getRigidbody(): RigidBody | null {
    return this.rigidBody;
  }

  public setScene(scene: Scene): void {
    this.scene = scene;
  }

  public setDisplay(display: Display): void {
    this.animator.setDisplay(display);
  }

  public setRigidBody(rigidBody: RigidBody): void {
    this.rigidBody = rigidBody;
    this.rigidBody.setGameObject(this);
  }

  // public setSpriteRenderer(spriteRenderer: SpriteRenderer): void {
  //   this.spriteRenderer = spriteRenderer;
  //   this.spriteRenderer.setGameObject(this);
  // }

  public update(): void {
    throw Error('Implement override');
  }
}
