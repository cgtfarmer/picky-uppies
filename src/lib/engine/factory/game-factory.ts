import Game from '../model/game';
import Player from '../../game/model/character/player';
import Scene from '../model/scene';
import PlayerFactory from '../../game/factory/player-factory';
import SceneFactory from './scene-factory';
import Display from '../model/display/display';

export default class GameFactory {

  private static singleton: GameFactory;

  private readonly display: Display;

  public static getInstance(display: Display): GameFactory {
    if (this.singleton == null) this.singleton = new GameFactory(display);

    return this.singleton;
  }

  public constructor(display: Display) {
    this.display = display;
  }

  public createDefault(): Game {
    const player: Player = PlayerFactory.getInstance(this.display).createDefault();

    const scenes: Scene[] = SceneFactory.getInstance(this.display).createScenes(player);

    return new Game(
      this.display,
      player,
      scenes
    );
  }
}
