import ResourceFactory from '/picky-uppies/assets/js/main/game/model/resource/resource-factory.js';
import Scene from './scene.js';
import Vector2 from '../vector2.js';
import Bounds from '../bounds.js';
import UiElementFactory from '../ui-element/ui-element-factory.js';
import CatchCounterFactory from '/picky-uppies/assets/js/main/game/model/catch-counter-factory.js';
import StopWatchFactory from '/picky-uppies/assets/js/main/game/model/stop-watch-factory.js';
export default class SceneFactory {
    static getInstance() {
        if (this.singleton == null) {
            this.singleton = new SceneFactory();
        }
        return this.singleton;
    }
    createScenes() {
        return [
            this.createSomeMap(),
            this.createGameOver(),
        ];
    }
    createSomeMap() {
        const bounds = new Bounds(Vector2.zero(), new Vector2(1360, 765));
        const resourceFactory = ResourceFactory.getInstance();
        const resources = [];
        for (let i = 0; i < 10; i++) {
            resources.push(resourceFactory.createRandom(bounds));
        }
        const uiElementFactory = UiElementFactory.getInstance();
        const uiElements = [
            // uiElementFactory.createButton(new Bounds(Vector2.zero(), new Vector2(250, 100))),
            // uiElementFactory.createCounter(
            //   new Vector2(bounds.getMax().x - 84, (bounds.getMax().y - 100))
            // ),
            CatchCounterFactory.getInstance().createDefault(bounds),
            StopWatchFactory.getInstance().createDefault(bounds)
        ];
        const scene = new Scene(bounds, [], resources, uiElements);
        // const resourceSpawnEngine: ResourceSpawnEngine =
        //   new ResourceSpawnEngine(resourceFactory, 100);
        // scene.setResourceSpawnEngine(resourceSpawnEngine);
        return scene;
    }
    createLotsMap() {
        return new Scene(new Bounds(Vector2.zero(), Vector2.zero()), [], [], []);
    }
    createTonsMap() {
        return new Scene(new Bounds(Vector2.zero(), Vector2.zero()), [], [], []);
    }
    createGameOver() {
        const bounds = new Bounds(Vector2.zero(), new Vector2(1360, 765));
        const youWinMsg = UiElementFactory.getInstance()
            .createTextElement(bounds.getCenter(), 'You Win!', 128);
        const uiElements = [
            youWinMsg,
        ];
        const scene = new Scene(bounds, [], [], uiElements);
        return scene;
    }
}
