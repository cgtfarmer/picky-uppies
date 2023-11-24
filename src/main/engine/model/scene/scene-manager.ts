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

  private scenes: Scene[];
  private activeScene: Scene | null;

  public constructor() {
    this.scenes = [];

    this.activeScene = null;

    // EventSystem.getInstance()
    //   .getTopic(Topics.ChangeScene)
    //   ?.subscribe(new Subscription(
    //     'scene-manager',
    //     (msg: Message) => this.handleChangeScene(msg.getId())
    //   ));

    // EventSystem.getInstance()
    //   .getTopic(Topics.GameOver)
    //   ?.subscribe(new Subscription(
    //     'scene-manager',
    //     (msg: Message) => this.handleGameOver(msg.getId())
    //   ));
  }

  public addScene(scene: Scene): void {
    this.scenes.push(scene);

    if (this.scenes.length == 1) this.activeScene = this.scenes[0];
  }

  public deleteScene(scene: Scene): void {
    const index: number | null = this.findSceneIndex(scene);

    if (index == null) return;

    if (this.activeScene == this.scenes[index]) this.activeScene = null;

    this.scenes.splice(index, 1);
  }

  public findSceneIndex(scene: Scene): number | null {
    for (let i = 0; i < this.scenes.length; i++) {
      const curScene = this.scenes[i];

      if (curScene == scene) return i;
    }

    return null;
  }

  public getScenes(): Scene[] {
    return this.scenes;
  }

  public setScenes(scenes: Scene[]): void {
    if (scenes.length < 1) return;

    this.scenes = scenes;
    this.activeScene = scenes[0];
  }

  public getActiveScene(): Scene | null {
    return this.activeScene;
  }

  public setDisplay(display: Display): void {
    this.scenes.forEach((scene) => scene.setDisplay(display));
  }

  public moveGameObjectToScene(gameObject: GameObject, scene: Scene): void {
    if (!this.activeScene) return;

    this.activeScene.deleteGameObject(gameObject);

    scene.addGameObject(gameObject);
  }

  public moveGameObjectToSceneByCustomId(customId: string, scene: Scene): void {
    if (!this.activeScene) return;

    const gameObject: GameObject | null = this.activeScene.findGameObjectByCustomId(customId);

    if (!gameObject) return;

    this.activeScene.deleteGameObject(gameObject);

    scene.addGameObject(gameObject);
  }

  public update(): void {
    if (!this.activeScene) return;

    this.activeScene.update();
  }

  // public handleChangeScene(id: string): void {
  //   console.log('[SceneManager#handleChangeScene]');

  //   const intId: number = parseInt(id);

  //   // TODO: Fix the utterly broken event system
  //   if (intId < 0 || intId >= this.scenes.length) return;

  //   this.activeScene = this.scenes[intId];

  //   const player: Player | null = this.game.getPlayer();
  //   if (player) {
  //     player.setScene(this.activeScene);
  //     this.activeScene.addGameObject(player);
  //   }

  //   const stopWatchIndex: number | null = this.activeScene
  //     .findGameObjectIndexByCustomId('stop-watch');

  //   if (stopWatchIndex == null) return;

  //   const stopWatch: StopWatch = this.activeScene
  //     .getGameObjectsByTag(Tag.UiElement)[stopWatchIndex] as StopWatch;

  //   stopWatch.start();
  // }

  // public handleGameOver(id: string): void {
  //   console.log('[SceneManager#handleGameOver]');

  //   if (this.scenes.length < 2) return;

  //   this.moveGameObjectToSceneByCustomId('catch-counter', this.scenes[2]);
  //   this.moveGameObjectToSceneByCustomId('stop-watch', this.scenes[2]);
  //   this.activeScene = this.scenes[1];
  // }
}
