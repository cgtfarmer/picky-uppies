import ResourceFactory from '../../../game/model/resource/resource-factory.js';
import Scene from './scene.js';
import Vector2 from '../vector2.js';
import Bounds from '../bounds.js';
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
        ];
    }
    createSomeMap() {
        const bounds = new Bounds(Vector2.zero(), new Vector2(1360, 765));
        const resourceFactory = ResourceFactory.getInstance();
        const resources = [];
        for (let i = 0; i < 10; i++) {
            resources.push(resourceFactory.createRandom(bounds));
        }
        const scene = new Scene(bounds, [], resources);
        // const resourceSpawnEngine: ResourceSpawnEngine =
        //   new ResourceSpawnEngine(resourceFactory, 100);
        // scene.setResourceSpawnEngine(resourceSpawnEngine);
        return scene;
    }
    createLotsMap() {
        return new Scene(new Bounds(Vector2.zero(), Vector2.zero()), [], []);
    }
    createTonsMap() {
        return new Scene(new Bounds(Vector2.zero(), Vector2.zero()), [], []);
    }
}
