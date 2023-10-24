import Sprite from './sprite';

export default class Rectangle extends Sprite {

  private color: string;

  public constructor(x: number, y: number, width: number, height: number, color: string) {
    super(x, y, width, height);

    this.color = color;
  }
}
