import Game from './game';
import Player from '../../../game/model/character/player';
import Scene from '@/main/engine/model/scene/scene';
import PlayerFactory from '../../../game/model/character/player-factory';
import SceneFactory from '../scene/scene-factory';
import EventSystem from '../../event-system/event-system';
import SceneManager from '../scene/scene-manager';

export default class GameFactory {

  private static singleton: GameFactory;

  public static getInstance(): GameFactory {
    if (this.singleton == null) this.singleton = new GameFactory();

    return this.singleton;
  }

  public createDefault(): Game {
    const player: Player = PlayerFactory.getInstance().createDefault();

    const scenes: Scene[] = SceneFactory.getInstance().createScenes();

    const eventSystem: EventSystem = EventSystem.getInstance();

    const sceneManager: SceneManager = new SceneManager(scenes);

    const game: Game = new Game(eventSystem, sceneManager);

    player.setScene(game.getActiveScene());
    game.setPlayer(player);
    return game;
  }
}
