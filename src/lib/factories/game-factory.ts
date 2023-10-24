import Game from '../models/game';
import Player from '../models/player';
import Scene from '../models/scene';
import PlayerFactory from './player-factory';
import SceneFactory from './scene-factory';

export default class GameFactory {

  private static singleton: GameFactory;

  public static getInstance(): GameFactory {
    if (this.singleton == null) this.singleton = new GameFactory();

    return this.singleton;
  }

  public createDefault(container: Element): Game {
    const player: Player = PlayerFactory.getInstance().createDefault();

    const scenes: Scene[] = SceneFactory.getInstance().createScenes(player);

    return new Game(
      container,
      player,
      scenes
    );
  }
}
