import Sprite from './sprite';

export default class Rectangle extends Sprite {

  public constructor(
    width: number,
    height: number,
    lineWidth: number,
    strokeColor: string,
    fillColor: string,
    fill: boolean,
  ) {
    super(width, height, lineWidth, strokeColor, fillColor, fill);
  }
}
