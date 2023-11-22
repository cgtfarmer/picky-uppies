import ResourceFactory from '@/main/game/model/resource/resource-factory';
import Scene from './scene';
import GameObject from '../game-object';
import Vector2 from '../vector2';
import Bounds from '../bounds';
import UiElementFactory from '../ui-element/ui-element-factory';
import StopWatch from '@/main/game/model/stop-watch';
import CatchCounterFactory from '@/main/game/model/catch-counter-factory';
import StopWatchFactory from '@/main/game/model/stop-watch-factory';
import TextSprite from '../sprite/canvas/text-sprite';
import UiElement from '../ui-element/ui-element';
import EventSystem from '../../event-system/event-system';
import { Topics } from '../../event-system/topics';
import Message from '../../event-system/message';

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
      this.createMainMenu(),
      this.createSomeMap(),
      this.createGameOver(),
    ];
  }

  public createMainMenu(): Scene {
    const bounds: Bounds = new Bounds(
      Vector2.zero(),
      new Vector2(1360, 765)
    );

    const uiElementFactory: UiElementFactory = UiElementFactory.getInstance();

    const title: UiElement = uiElementFactory.createTextElement(
      new Vector2(bounds.getCenter().x, bounds.getMax().y - 150), 'Catch the Elves', 128
    );

    const center: Vector2 = bounds.getCenter();
    const someLevel: UiElement = uiElementFactory.createTextElement(
      new Vector2(center.x, center.y + 50), 'Some', 64
    );
    someLevel.setOnClickHandler(() => {
      EventSystem.getInstance()
        .getTopic(Topics.ChangeScene)
        ?.publish(new Message('1'));
    });

    const uiElements: GameObject[] = [
      title,
      someLevel
    ];

    const scene: Scene = new Scene(bounds, [], [], uiElements);

    return scene;
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
      // uiElementFactory.createCounter(
      //   new Vector2(bounds.getMax().x - 84, (bounds.getMax().y - 100))
      // ),
      CatchCounterFactory.getInstance().createDefault(bounds),
      StopWatchFactory.getInstance().createDefault(bounds)
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

  public createGameOver(): Scene {
    const bounds: Bounds = new Bounds(
      Vector2.zero(),
      new Vector2(1360, 765)
    );

    const youWinMsg: UiElement = UiElementFactory.getInstance()
      .createTextElement(bounds.getCenter(), 'You Win!', 128);

    const uiElements: GameObject[] = [
      youWinMsg,
    ];

    const scene: Scene = new Scene(bounds, [], [], uiElements);

    return scene;
  }
}
