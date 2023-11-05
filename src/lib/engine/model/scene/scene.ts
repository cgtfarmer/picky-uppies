import ResourceSpawnEngine from '@/lib/game/model/resource/resource-spawn-engine';
import { Renderable } from '../../interface/renderable';
import { Display } from '../display/display';
import GameObject from '../game-object';
import { SpriteRenderer } from '../sprite-renderer/sprite-renderer';
import SpriteRendererFactory from '../sprite-renderer/sprite-renderer-factory';
import Sprite from '../sprite/sprite';
import Bounds from '../bounds';

export default class Scene implements Renderable {

  private readonly bounds: Bounds;

  private resourceSpawnEngine: ResourceSpawnEngine | null;

  private players: GameObject[];

  private resources: GameObject[];

  public constructor(
    bounds: Bounds, players: GameObject[], resources: GameObject[]
  ) {
    this.bounds = bounds;
    this.players = players;
    this.resources = resources;
    this.resourceSpawnEngine = null;
  }

  public setResourceSpawnEngine(resourceSpawnEngine: ResourceSpawnEngine): void {
    this.resourceSpawnEngine = resourceSpawnEngine;
    this.resourceSpawnEngine.setScene(this);
  }

  public getBounds(): Bounds {
    return this.bounds;
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
        // spriteRendererFactory.create(sprite, display, gameObject.getTransform());
        spriteRendererFactory.create(sprite, display, this);

      gameObject.setSpriteRenderer(spriteRenderer);
    });

    this.resources.forEach((gameObject: GameObject) => {
      const sprite: Sprite | null = gameObject.getSprite();

      if (sprite == null) return;

      const spriteRenderer: SpriteRenderer =
        spriteRendererFactory.create(sprite, display, gameObject.getTransform());

      gameObject.setSpriteRenderer(spriteRenderer);
    });
  }

  public update(): void {
    this.resources.forEach(e => e.update());
    this.players.forEach(e => e.update());
    this.resourceSpawnEngine?.update();
  }
}
