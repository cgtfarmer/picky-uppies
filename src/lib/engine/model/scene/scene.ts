import ResourceSpawnEngine from '@/lib/game/model/resource/resource-spawn-engine';
import { Renderable } from '../../interface/renderable';
import { Display } from '../display/display';
import GameObject from '../game-object';
import { SpriteRenderer } from '../sprite-renderer/sprite-renderer';
import SpriteRendererFactory from '../sprite-renderer/sprite-renderer-factory';
import Sprite from '../sprite/sprite';

export default class Scene implements Renderable {

  private readonly width: number;
  private readonly height: number;

  private resourceSpawnEngine: ResourceSpawnEngine | null;

  private players: GameObject[];

  private resources: GameObject[];

  public constructor(
    width: number, height: number, players: GameObject[], resources: GameObject[]
  ) {
    this.width = width;
    this.height = height;
    this.players = players;
    this.resources = resources;
    this.resourceSpawnEngine = null;
  }

  public setResourceSpawnEngine(resourceSpawnEngine: ResourceSpawnEngine): void {
    this.resourceSpawnEngine = resourceSpawnEngine;
    this.resourceSpawnEngine.setScene(this);
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public getPlayers() {
    return this.players;
  }

  public getResources() {
    return this.resources;
  }

  public setResources(resources: GameObject[]): void {
    this.resources = resources;
  }

  public addRenderable(renderable: GameObject) {
    this.players.push(renderable);
  }

  public generateSpriteRenderers(display: Display): void {
    const spriteRendererFactory: SpriteRendererFactory = SpriteRendererFactory.getInstance();

    this.players.forEach((gameObject: GameObject) => {
      const sprite: Sprite | null = gameObject.getSprite();

      if (sprite == null) return;

      const spriteRenderer: SpriteRenderer =
        spriteRendererFactory.create(sprite, display, gameObject.getTransform());

      gameObject.setSpriteRenderer(spriteRenderer);
    });

    // this.resources.forEach((gameObject: GameObject) => {
    //   const sprite: Sprite | null = gameObject.getSprite();

    //   if (sprite == null) return;

    //   const spriteRenderer: SpriteRenderer =
    //     spriteRendererFactory.create(sprite, display, gameObject.getTransform());

    //   gameObject.setSpriteRenderer(spriteRenderer);
    // });
  }

  public update(): void {
    this.resources.forEach(e => e.update());
    this.players.forEach(e => e.update());
    this.resourceSpawnEngine?.update();
  }
}
