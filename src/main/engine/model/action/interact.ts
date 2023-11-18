import EventSystem from '../../event-system/event-system';
import Message from '../../event-system/message';
import { Topics } from '../../event-system/topics';
import { Renderable } from '../../interface/renderable';
import GameObject from '../game-object';
import Game from '../game/game';
import Physics2D from '../physics-2d';
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

    const intersections: GameObject[] = Physics2D.getInstance().overlapCircle(
      position, this.radius, Game.getInstance().getActiveScene().getResources()
    );

    intersections.forEach((e) => {
      EventSystem.getInstance()
        .getTopic(Topics.Interact)
        ?.publish(new Message(e.id));
    });
    // emit 'interact' events on each one?
  }
}
