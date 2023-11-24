import Player from '@/main/game/model/character/player';
import { Action } from '../model/action/action';
import Vector2 from '../model/vector2';

export default class GameController {

  private player: Player;

  public constructor(player: Player) {
    this.player = player;
  }

  public setPlayerMovement(direction: Vector2): void {
    this.player.setMovement(direction);
  }

  public queuePlayerAction(action: Action): void {
    this.player.queueAction(action);
  }
}
