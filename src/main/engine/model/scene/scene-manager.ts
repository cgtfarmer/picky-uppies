import EventSystem from '../../event-system/event-system';
import Message from '../../event-system/message';
import Subscription from '../../event-system/subscription';
import { Topics } from '../../event-system/topics';
import { Display } from '../display/display';
import GameObject from '../game-object';
import Scene from './scene';

export default class SceneManager {

  private scenes: Scene[];
  private activeScene: Scene;

  public constructor(scenes: Scene[]) {
    this.scenes = scenes;

    if (this.scenes.length < 1) throw new Error('At least 1 Scene required');

    this.activeScene = scenes[0];

    EventSystem.getInstance()
      .getTopic(Topics.GameOver)
      ?.subscribe(new Subscription(
        'scene-manager',
        (msg: Message) => this.handleGameOver(msg.getId())
      ));
  }

  public getActiveScene(): Scene {
    return this.activeScene;
  }

  public setDisplay(display: Display): void {
    this.scenes.forEach((scene) => scene.setDisplay(display));
  }

  public moveGameObjectToSceneByCustomId(customId: string, scene: Scene): void {
    // TODO: Fix GameObject handling in scenes so this doesn't have to be stupid

    const index: number | null = this.activeScene.findGameObjectIndexByCustomId(customId);

    if (index == null) return;

    const gameObject: GameObject = this.activeScene.getUiElements()[index];

    this.activeScene.removeGameObjectByIndex(index);

    scene.addGameObject(gameObject);
  }

  public update(): void {
    this.activeScene.update();
  }

  public handleGameOver(id: string): void {
    console.log('[SceneManager#handleGameOver]');

    if (this.scenes.length < 2) return;

    this.moveGameObjectToSceneByCustomId('catch-counter', this.scenes[1]);
    this.moveGameObjectToSceneByCustomId('stop-watch', this.scenes[1]);
    this.activeScene = this.scenes[1];
  }
}
