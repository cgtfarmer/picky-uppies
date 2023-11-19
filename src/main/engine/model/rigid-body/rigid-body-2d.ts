import GameObject from '../game-object';
import Game from '../game/game';
import Transform from '../transform';
import Vector2 from '../vector2';
import { RigidBody } from './rigid-body';

export default class RigidBody2d implements RigidBody {

  private gameObject: GameObject | null;

  public constructor() {
    this.gameObject = null;
  }

  public setGameObject(gameObject: GameObject): void {
    this.gameObject = gameObject;
  }

  public getPosition(): Vector2 | null {
    if (this.gameObject == null) return null;

    return this.gameObject.getTransform().position;
  }

  public translate(delta: Vector2): void {
    // console.log(`[RigidBody2d#translate] delta=${delta}`);

    const displayTransformMatrix: Vector2 | null = Game.getInstance().getDisplayTransformMatrix();

    if (this.gameObject == null || displayTransformMatrix == null) return;

    const displayAdjustedDelta = delta.multiply(displayTransformMatrix);

    // console.log(`[RigidBody2d#translate] displayAdjustedDelta=${displayAdjustedDelta}`);

    this.gameObject.getTransform().translate(displayAdjustedDelta);
  }

  public movePosition(position: Vector2): void {
    // if (this.gameObject == null) return;

    // this.gameObject.getTransform().translate(
    //   .scale(displayTransformMatrix);

    // this.transform.translate(this.velocity);
  }
}
