import ResourceFactory from '@/lib/game/model/resource/resource-factory';
import Scene from './scene';
import ResourceSpawnEngine from '@/lib/game/model/resource/resource-spawn-engine';
import Resource from '@/lib/game/model/resource/resource';
import GameObject from '../game-object';
import Vector2 from '../vector2';
import Bounds from '../bounds';

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
      new Vector2(0, 0),
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
}
