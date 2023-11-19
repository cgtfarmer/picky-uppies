import ResourceFactory from '../../../game/model/resource/resource-factory';
import Scene from './scene';
// import ResourceSpawnEngine from '@/game/model/resource/resource-spawn-engine';
import Resource from '../../../game/model/resource/resource';
import GameObject from '../game-object';
import Vector2 from '../vector2';
import Bounds from '../bounds';
import UiElementFactory from '../ui-element/ui-element-factory';

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

    const uiElementFactory: UiElementFactory = UiElementFactory.getInstance();

    const uiElements: GameObject[] = [
      // uiElementFactory.createButton(new Bounds(Vector2.zero(), new Vector2(250, 100))),
      uiElementFactory.createCounter(
        new Vector2(bounds.getMax().x - 84, (bounds.getMax().y - 100))
      ),
    ];

    const scene: Scene = new Scene(bounds, [], resources, uiElements);

    // const resourceSpawnEngine: ResourceSpawnEngine =
    //   new ResourceSpawnEngine(resourceFactory, 100);
    // scene.setResourceSpawnEngine(resourceSpawnEngine);

    return scene;
  }

  public createLotsMap(): Scene {
    return new Scene(new Bounds(Vector2.zero(), Vector2.zero()), [], [], []);
  }

  public createTonsMap(): Scene {
    return new Scene(new Bounds(Vector2.zero(), Vector2.zero()), [], [], []);
  }
}
