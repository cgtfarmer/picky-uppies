import Vector2 from './vector2';

export default class Transform {

  private position: Vector2;

  public constructor(position: Vector2) {
    this.position = position;
  }

  public getPosition(): Vector2 {
    return this.position;
  }

  public setPosition(position: Vector2): void {
    this.position = position;
  }
}
