import Vector2 from './vector2.js';

export default class Transform {

  public position: Vector2;

  public constructor(position: Vector2) {
    this.position = position;
  }

  public translate(value: Vector2): void {
    this.position.add(value);
  }

  // public getPosition(): Vector2 {
  //   return this.position;
  // }

  // public setPosition(position: Vector2): void {
  //   this.position = position;
  // }
}
