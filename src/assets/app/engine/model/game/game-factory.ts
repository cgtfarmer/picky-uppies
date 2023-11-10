import Game from './game.js';
import Player from '../../../game/model/character/player.js';
import Scene from '@/engine/model/scene/scene.js';
import PlayerFactory from '@/game/model/character/player-factory.js';
import SceneFactory from '../scene/scene-factory.js';
import EventSystem from '../../event-system/event-system.js';

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

    const game: Game = new Game(eventSystem, scenes);

    player.setScene(game.getActiveScene());
    game.setPlayer(player);
    return game;
  }
}
