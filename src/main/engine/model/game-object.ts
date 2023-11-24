import { Renderable } from '../interface/renderable';
import Animator from './animator/animator';
import { Display } from './display/display';
import Scene from './scene/scene';
import Transform from './transform';
import UuidProvider from '@/main/engine/uuid-provider';
import Vector2 from './vector2';
import { RigidBody } from './rigid-body/rigid-body';
import { Tag } from './tag';

type OnClickHandler = () => void;

export default class GameObject implements Renderable {

  public readonly id: string;

  public readonly customId: string | null;

  public readonly tags: Tag[];

  protected readonly transform: Transform;

  protected enabled: boolean;

  protected scene: Scene | null;

  protected animator: Animator | null;

  protected rigidBody: RigidBody | null;

  protected onClickHandler: OnClickHandler | null;

  public constructor(customId: string | null, tags: Tag[]) {
    if (customId?.trim() == '') throw new Error('Custom ID must be present or null');

    this.id = UuidProvider.getRandom();
    this.customId = customId;
    this.tags = tags;
    this.enabled = true;
    this.transform = new Transform(Vector2.zero());
    this.scene = null;
    this.animator = null;
    this.rigidBody = null;
    this.customId = null;
    this.onClickHandler = null;
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

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setAnimator(animator: Animator): void {
    this.animator = animator;
    this.animator.setGameObject(this);
  }

  public setScene(scene: Scene | null): void {
    this.scene = scene;
  }

  public setDisplay(display: Display): void {
    this.animator?.setDisplay(display);
  }

  public setRigidBody(rigidBody: RigidBody): void {
    this.rigidBody = rigidBody;
    this.rigidBody.setGameObject(this);
  }

  public setOnClickHandler(onClickHandler: OnClickHandler): void {
    this.onClickHandler = onClickHandler;
  }

  public onClick(): void {
    if (this.onClickHandler == null) return;

    this.onClickHandler();
  }

  public update(): void {
    throw Error('Implement override');
  }
}
