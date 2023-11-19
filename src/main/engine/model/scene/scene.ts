import { Renderable } from '../../interface/renderable';
import { Display } from '../display/display';
import GameObject from '../game-object';
import { SpriteRenderer } from '../sprite-renderer/sprite-renderer';
import Sprite from '../sprite/sprite';
import Bounds from '../bounds';

export default class Scene implements Renderable {

  private readonly bounds: Bounds;

  // private resourceSpawnEngine: ResourceSpawnEngine | null;

  private players: GameObject[];

  private resources: GameObject[];

  private uiElements: GameObject[];

  public constructor(
    bounds: Bounds, players: GameObject[], resources: GameObject[], uiElements: GameObject[]
  ) {
    this.bounds = bounds;
    this.players = players;
    this.resources = resources;
    this.uiElements = uiElements;
    // this.resourceSpawnEngine = null;
  }

  // public setResourceSpawnEngine(resourceSpawnEngine: ResourceSpawnEngine): void {
  //   this.resourceSpawnEngine = resourceSpawnEngine;
  //   this.resourceSpawnEngine.setScene(this);
  // }

  public getBounds(): Bounds {
    return this.bounds;
  }

  public getPlayers() {
    return this.players;
  }

  public getResources() {
    return this.resources;
  }

  public getUiElements() {
    return this.uiElements;
  }

  public addGameObject(gameObject: GameObject): void {
    // TODO: Finish
    this.uiElements.push(gameObject);
  }

  public removeGameObjectByCustomId(customId: string): void {
    // TODO: Finish
    const index = this.findGameObjectIndexByCustomId(customId);

    if (index == null) return;

    this.uiElements.splice(index, 1);
  }

  public removeGameObjectByIndex(index: number): void {
    // TODO: Finish
    this.uiElements.splice(index, 1);
  }

  public findGameObjectIndexByCustomId(customId: string): number | null {
    // TODO: Finish
    for (let i = 0; i < this.uiElements.length; i++) {
      var uiElement = this.uiElements[i];

      if (uiElement.customId != customId) continue;

      return i;
    }

    return null;
  }

  public setResources(resources: GameObject[]): void {
    this.resources = resources;
  }

  public addRenderable(renderable: GameObject) {
    this.players.push(renderable);
  }

  public setDisplay(display: Display): void {
    // const spriteRendererFactory: SpriteRendererFactory = SpriteRendererFactory.getInstance();

    this.players.forEach((gameObject: GameObject) => {
      // const sprite: Sprite | null = gameObject.getSprite();

      // if (sprite == null) return;

      // const spriteRenderer: SpriteRenderer =
      //   // spriteRendererFactory.create(sprite, display, gameObject.getTransform());
      //   spriteRendererFactory.create(sprite, display, this);

      gameObject.setDisplay(display);

      // gameObject.setSpriteRenderer(spriteRenderer);
    });

    this.resources.forEach((gameObject: GameObject) => {
      // const sprite: Sprite | null = gameObject.getSprite();

      // if (sprite == null) return;

      // const spriteRenderer: SpriteRenderer =
      //   spriteRendererFactory.create(sprite, display, this);

      // const spriteRenderer: SpriteRenderer =

      gameObject.setDisplay(display);
    });

    this.uiElements.forEach((gameObject: GameObject) => {
      gameObject.setDisplay(display);
    });
  }

  public update(): void {
    // console.log(this.resources);
    this.resources.forEach(e => e.update());
    this.players.forEach(e => e.update());
    this.uiElements.forEach(e => e.update());
    // this.resourceSpawnEngine?.update();
  }
}
