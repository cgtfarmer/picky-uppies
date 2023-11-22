import Player from '@/main/game/model/character/player';
import EventSystem from '../../event-system/event-system';
import Message from '../../event-system/message';
import Subscription from '../../event-system/subscription';
import { Topics } from '../../event-system/topics';
import { Display } from '../display/display';
import GameObject from '../game-object';
import Game from '../game/game';
import Scene from './scene';
import StopWatch from '@/main/game/model/stop-watch';
import { Tag } from '../tag';

export default class SceneManager {

  private game: Game;
  private scenes: Scene[];
  private activeScene: Scene | null;

  public constructor(game: Game, scenes: Scene[]) {
    this.game = game;
    this.scenes = scenes;

    // // if (this.scenes.length < 1) throw new Error('At least 1 Scene required');

    // this.activeScene = scenes[0];
    this.activeScene = null;

    EventSystem.getInstance()
      .getTopic(Topics.ChangeScene)
      ?.subscribe(new Subscription(
        'scene-manager',
        (msg: Message) => this.handleChangeScene(msg.getId())
      ));

    EventSystem.getInstance()
      .getTopic(Topics.GameOver)
      ?.subscribe(new Subscription(
        'scene-manager',
        (msg: Message) => this.handleGameOver(msg.getId())
      ));
  }

  public setScenes(scenes: Scene[]): void {
    this.scenes = scenes;
    this.activeScene = scenes[0];
  }

  public getActiveScene(): Scene | null {
    return this.activeScene;
  }

  public setDisplay(display: Display): void {
    this.scenes.forEach((scene) => scene.setDisplay(display));
  }

  public moveGameObjectToSceneByCustomId(customId: string, scene: Scene): void {
    if (!this.activeScene) return;

    // TODO: Fix GameObject handling in scenes so this doesn't have to be stupid

    const index: number | null = this.activeScene.findGameObjectIndexByCustomId(customId);

    if (index == null) return;

    const gameObject: GameObject = this.activeScene.getGameObjectsByTag(Tag.UiElement)[index];

    this.activeScene.removeGameObjectByIndex(index);

    scene.addGameObject(gameObject);
  }

  public update(): void {
    if (!this.activeScene) return;

    this.activeScene.update();
  }

  public handleChangeScene(id: string): void {
    console.log('[SceneManager#handleChangeScene]');

    const intId: number = parseInt(id);

    // TODO: Fix the utterly broken event system
    if (intId < 0 || intId >= this.scenes.length) return;

    this.activeScene = this.scenes[intId];

    const player: Player | null = this.game.getPlayer();
    if (player) {
      player.setScene(this.activeScene);
      this.activeScene.addGameObject(player);
    }

    const stopWatchIndex: number | null = this.activeScene
      .findGameObjectIndexByCustomId('stop-watch');

    if (stopWatchIndex == null) return;

    const stopWatch: StopWatch = this.activeScene
      .getGameObjectsByTag(Tag.UiElement)[stopWatchIndex] as StopWatch;

    stopWatch.start();
  }

  public handleGameOver(id: string): void {
    console.log('[SceneManager#handleGameOver]');

    if (this.scenes.length < 2) return;

    this.moveGameObjectToSceneByCustomId('catch-counter', this.scenes[2]);
    this.moveGameObjectToSceneByCustomId('stop-watch', this.scenes[2]);
    this.activeScene = this.scenes[1];
  }
}
