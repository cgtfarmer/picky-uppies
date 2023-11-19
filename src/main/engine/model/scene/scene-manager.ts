import { Display } from '../display/display';
import Scene from './scene';

export default class SceneManager {

  private scenes: Scene[];
  private activeScene: Scene;

  public constructor(scenes: Scene[]) {
    this.scenes = scenes;

    if (this.scenes.length < 1) throw new Error('At least 1 Scene required');

    this.activeScene = scenes[0];
  }

  public getActiveScene(): Scene {
    return this.activeScene;
  }

  public setDisplay(display: Display): void {
    this.scenes.forEach((scene) => scene.setDisplay(display));
  }

  public update(): void {
    this.activeScene.update();
  }
}
