import Inventory from '../models/inventory';
import Player from '../models/player';
import Rectangle from '../models/rectangle';
import Sprite from '../models/sprite';
import Transform from '../models/transform';

export default class PlayerFactory {

  private static singleton: PlayerFactory;

  public static getInstance(): PlayerFactory {
    if (this.singleton == null) this.singleton = new PlayerFactory();

    return this.singleton;
  }

  public createDefault(): Player {
    const sprite: Sprite = new Rectangle(0, 0, 40, 40, '#ff0000');

    const inventory: Inventory = new Inventory();

    const transform: Transform = new Transform(0, 0);

    return new Player(
      'Player',
      100,
      100,
      0.5,
      1.0,
      0.05,
      0.5,
      100,
      transform,
      sprite,
      inventory
    );
  }
}
