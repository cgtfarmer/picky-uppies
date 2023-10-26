import CanvasDisplay from '../model/display/canvas-display';
import Game from '../model/game';
import Player from '../../game/model/character/player';
import Scene from '../model/scene';
import PlayerFactory from '../../game/factory/player-factory';
import SceneFactory from './scene-factory';

export default class GameFactory {

  private static singleton: GameFactory;

  private readonly canvas: CanvasDisplay;

  public static getInstance(canvas: CanvasDisplay): GameFactory {
    if (this.singleton == null) this.singleton = new GameFactory(canvas);

    return this.singleton;
  }

  public constructor(canvas: CanvasDisplay) {
    this.canvas = canvas;
  }

  public createDefault(): Game {
    const player: Player = PlayerFactory.getInstance(this.canvas).createDefault();

    const scenes: Scene[] = SceneFactory.getInstance(this.canvas).createScenes(player);

    return new Game(
      this.canvas,
      player,
      scenes
    );
  }
}
