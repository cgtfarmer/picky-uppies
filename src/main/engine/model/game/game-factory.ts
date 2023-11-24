import Game from './game';
import Player from '../../../game/model/character/player';
import Scene from '@/main/engine/model/scene/scene';
import PlayerFactory from '../../../game/model/character/player-factory';
import SceneFactory from '../scene/scene-factory';
import EventSystem from '../../event-system/event-system';
import SceneManager from '../scene/scene-manager';
import BrowserInputController from '../../../client/browser-game-client';
import { InputModule } from '@/main/engine/model/input-module~/input-module';
import KeybindModule from '@/main/engine/model/keybind-module/keybind-module';
import { Action } from '@/main/engine/model/action/action';
import Interact from '@/main/engine/model/action/interact';
import Display from '../display/canvas-display';
import CanvasDisplay from '../display/canvas-display';
import Vector2 from '../vector2';
import { Tag } from '../tag';
import GameObject from '../game-object';
import Physics2D from '../physics-2d';

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

    const game: Game = new Game();
    game.getSceneManager().setScenes(scenes);

    const inputModule: BrowserInputController = new BrowserInputController();
    inputModule.setOnMouseDown((event: MouseEvent) => {
      const display: CanvasDisplay | null = game.getDisplay() as CanvasDisplay;

      if (display == null) return;

      const rect: DOMRect = display.getHtmlCanvasElement().getBoundingClientRect();

      const activeSceneExtents: Vector2 | undefined = game.getActiveScene()
        ?.getBounds()
        .getExtents();

      if (activeSceneExtents == undefined) return;

      const clickPosition: Vector2 = new Vector2(
        (event.clientX - (rect.left + activeSceneExtents.x)),
        (event.clientY - (rect.top + activeSceneExtents.y))
      );

      console.log(`[BrowserInputModule#mousedown-event] clickPosition=${clickPosition}`);

      const uiElements: GameObject[] | undefined = game.getActiveScene()
        ?.getGameObjectsByTag(Tag.UiElement);

      if (!uiElements) return;

      // TODO: This is so bad and janky, please fix yesterday
      const results: GameObject[] = Physics2D.getInstance()
        .overlapCircleAll(clickPosition, 100, uiElements);

      results.forEach((e) => e.onClick());
    });

    const keybindings: Map<string, Action> = new Map<string, Action>([
      [' ', new Interact(0, 55)],
    ]);
    const keybindModule: KeybindModule = new KeybindModule(inputModule, keybindings);

    game.setPlayer(player);
    keybindModule.setPlayer(player);
    game.setInputModule(keybindModule);
    return game;
  }
}
