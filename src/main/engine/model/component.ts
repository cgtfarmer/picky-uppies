import GameObject from './game-object';
import Transform from './transform';

export default class Component {

  protected readonly gameObject: GameObject;
  protected readonly transform: Transform;

  public constructor(gameObject: GameObject, transform: Transform) {
    this.gameObject = gameObject;
    this.transform = transform;
  }
}
