import Player from '../../../game/model/character/player';
import { Action } from '../action/action';
import { Display } from '../display/display';
import { InputModule } from '../input-module/input-module';

export default class KeybindModule {

  private player: Player | null;

  private readonly inputModule: InputModule;

  private readonly keybindings: Map<string, Action>;

  public constructor(
    inputModule: InputModule,
    keybindings: Map<string, Action>
  ) {
    this.player = null;
    this.inputModule = inputModule;
    this.keybindings = keybindings;
  }

  public getInputModule(): InputModule {
    return this.inputModule;
  }

  public setPlayer(player: Player) {
    this.player = player;
  }

  public setDisplay(display: Display) {
    this.inputModule.setDisplay(display);
  }

  public perform() {
    if (this.player == null) throw Error('Must be registered to player');

    this.inputModule.getActiveKeys().forEach((key: string) => {
      if (this.player == null) throw Error('Must be registered to player');

      const action: Action | undefined = this.keybindings.get(key);
      if (action == undefined) return;

      // console.log(`[KeybindModule#perform] '${key}'`);
      action.perform(this.player.getTransform().position);
    });
  }
}
