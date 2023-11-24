import EventSystem from '../../event-system/event-system';
import Message from '../../event-system/message';
import { Topics } from '../../event-system/topics';
import { Renderable } from '../../interface/renderable';
import GameObject from '../game-object';
import Game from '../game/game';
import Physics2D from '../physics-2d';
import Scene from '../scene/scene';
import { Tag } from '../tag';
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

    const activeScene: Scene | null = Game.getInstance().getActiveScene();

    if (!activeScene) return;

    const intersections: GameObject[] = Physics2D.getInstance().overlapCircleAll(
      position, this.radius, activeScene.getGameObjectsByTag(Tag.Resource)
    );

    intersections.forEach((e) => {
      EventSystem.getInstance()
        .getTopic(Topics.Interact)
        ?.publish(new Message(e.id));
    });
    // emit 'interact' events on each one?
  }
}
