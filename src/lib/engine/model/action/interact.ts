import { Renderable } from '../../interface/renderable';
import Game from '../game/game';
import Vector2 from '../vector2';
import { Action } from './action';

export default class Interact implements Action {

  private castTime: number;
  private radius: number;

  public constructor(
    castTime: number,
    radius: number
  ) {
    this.castTime = castTime;
    this.radius = radius;
  }

  public perform(position: Vector2): void {
    console.log('[Interact#perform]');
    // renderables: Renderable[] = Physics2D.OverlapCircle(
    //   position, this.radius, Game.getInstance().getActiveScene().getRenderables()
    // );

    // const renderables: Renderable[] = Game.getInstance()
    //   .getActiveScene()
    //   .getRenderables();

    // emit 'interact' events on each one?
  }
}
