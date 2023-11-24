import Player from '@/main/game/model/character/player';
import { Display } from '../model/display/display';
import Game from '../model/game/game';
import Vector2 from '../model/vector2';

export default class GameController {

  private game: Game;

  public constructor(game: Game) {
    this.game = game;
  }

  public click(position: Vector2): void {
    this.game.click(position);
  }

  public setDisplay(display: Display): void {
    this.game.setDisplay(display);
  }

  public setPlayer(player: Player): void {
    this.game.setPlayer(player);
  }
}
