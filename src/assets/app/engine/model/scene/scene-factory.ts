import ResourceFactory from '@/game/model/resource/resource-factory.js';
import Scene from './scene.js';
// import ResourceSpawnEngine from '@/game/model/resource/resource-spawn-engine.js';
import Resource from '@/game/model/resource/resource.js';
import GameObject from '../game-object.js';
import Vector2 from '../vector2.js';
import Bounds from '../bounds.js';

export default class SceneFactory {

  private static singleton: SceneFactory;

  public static getInstance(): SceneFactory {
    if (this.singleton == null) {
      this.singleton = new SceneFactory();
    }

    return this.singleton;
  }

  public createScenes(): Scene[] {
    return [
      this.createSomeMap(),
    ];
  }

  public createSomeMap(): Scene {
    const bounds: Bounds = new Bounds(
      Vector2.zero(),
      new Vector2(1360, 765)
    );

    const resourceFactory: ResourceFactory = ResourceFactory.getInstance();

    const resources: GameObject[] = [];
    for (let i = 0; i < 10; i++) {
      resources.push(resourceFactory.createRandom(bounds));
    }

    const scene: Scene = new Scene(bounds, [], resources);

    // const resourceSpawnEngine: ResourceSpawnEngine =
    //   new ResourceSpawnEngine(resourceFactory, 100);
    // scene.setResourceSpawnEngine(resourceSpawnEngine);

    return scene;
  }

  public createLotsMap(): Scene {
    return new Scene(new Bounds(Vector2.zero(), Vector2.zero()), [], []);
  }

  public createTonsMap(): Scene {
    return new Scene(new Bounds(Vector2.zero(), Vector2.zero()), [], []);
  }
}
