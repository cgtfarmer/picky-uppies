import Game from './game';
import Player from '../../../game/model/character/player';
import Scene from '@/main/engine/model/scene/scene';
import PlayerFactory from '../../../game/model/character/player-factory';
import SceneFactory from '../scene/scene-factory';
import EventSystem from '../../event-system/event-system';
import SceneManager from '../scene/scene-manager';
import BrowserInputModule from '../../../engine/model/input-module/browser-input-module';
import { InputModule } from '@/main/engine/model/input-module/input-module';
import KeybindModule from '@/main/engine/model/keybind-module/keybind-module';
import { Action } from '@/main/engine/model/action/action';
import Interact from '@/main/engine/model/action/interact';

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

    const game: Game = new Game(eventSystem);
    game.getSceneManager().setScenes(scenes);

    const inputModule: InputModule = new BrowserInputModule(game);

    const keybindings: Map<string, Action> = new Map<string, Action>([
      [' ', new Interact(0, 55)],
    ]);
    const keybindModule: KeybindModule = new KeybindModule(inputModule, keybindings);

    game.setPlayer(player);
    keybindModule.setPlayer(player);
    game.setKeybindModule(keybindModule);
    return game;
  }
}
