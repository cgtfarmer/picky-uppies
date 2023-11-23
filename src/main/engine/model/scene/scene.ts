import { Renderable } from '../../interface/renderable';
import { Display } from '../display/display';
import GameObject from '../game-object';
import { SpriteRenderer } from '../sprite-renderer/sprite-renderer';
import Sprite from '../sprite/sprite';
import Bounds from '../bounds';
import { Tag } from '../tag';
import Game from '../game/game';

export default class Scene implements Renderable {

  private readonly bounds: Bounds;

  private gameObjects: GameObject[];

  // private resourceSpawnEngine: ResourceSpawnEngine | null;

  // private players: GameObject[];

  // private resources: GameObject[];

  // private uiElements: GameObject[];

  public constructor(bounds: Bounds) {
    this.bounds = bounds;
    this.gameObjects = [];
  }

  public addGameObject(gameObject: GameObject): void {
    this.gameObjects.push(gameObject);
    gameObject.setScene(this);
  }

  public removeGameObject(gameObject: GameObject): void {
    const index: number | null = this.findGameObjectIndex(gameObject);

    if (index == null) return;

    this.gameObjects[index].setScene(null);
    this.gameObjects.splice(index, 1);
  }

  public removeGameObjectByCustomId(customId: string): void {
    const index = this.findGameObjectIndexByCustomId(customId);

    if (index == null) return;

    this.gameObjects[index].setScene(null);
    this.gameObjects.splice(index, 1);
  }

  public removeGameObjectByIndex(index: number): void {
    this.gameObjects[index].setScene(null);
    this.gameObjects.splice(index, 1);
  }

  public getBounds(): Bounds {
    return this.bounds;
  }

  public getGameObjects(): GameObject[] {
    return this.gameObjects;
  }

  public getGameObjectsByTag(tag: Tag): GameObject[] {
    return this.gameObjects.filter((e) => e.tags.includes(tag));
  }

  public findGameObjectByCustomId(customId: string): GameObject | null {
    for (let gameObject of this.gameObjects) {
      if (gameObject.customId == customId) return gameObject;
    }

    return null;
  }

  public findGameObjectIndex(gameObject: GameObject): number | null {
    for (let i = 0; i < this.gameObjects.length; i++) {
      var curGameObject = this.gameObjects[i];

      if (curGameObject == gameObject) return i;
    }

    return null;
  }

  public findGameObjectIndexByCustomId(customId: string): number | null {
    for (let i = 0; i < this.gameObjects.length; i++) {
      var gameObject = this.gameObjects[i];

      if (gameObject.customId == customId) return i;
    }

    return null;
  }

  public setDisplay(display: Display): void {
    this.gameObjects.forEach((gameObject: GameObject) => {
      gameObject.setDisplay(display);
    });
  }

  public update(): void {
    this.gameObjects.forEach(e => e.update());
  }
}
