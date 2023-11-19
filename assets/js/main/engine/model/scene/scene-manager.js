import EventSystem from '../../event-system/event-system.js';
import Subscription from '../../event-system/subscription.js';
import { Topics } from '../../event-system/topics.js';
export default class SceneManager {
    constructor(scenes) {
        var _a;
        this.scenes = scenes;
        if (this.scenes.length < 1)
            throw new Error('At least 1 Scene required');
        this.activeScene = scenes[0];
        (_a = EventSystem.getInstance()
            .getTopic(Topics.GameOver)) === null || _a === void 0 ? void 0 : _a.subscribe(new Subscription('scene-manager', (msg) => this.handleGameOver(msg.getId())));
    }
    getActiveScene() {
        return this.activeScene;
    }
    setDisplay(display) {
        this.scenes.forEach((scene) => scene.setDisplay(display));
    }
    moveGameObjectToSceneByCustomId(customId, scene) {
        // TODO: Fix GameObject handling in scenes so this doesn't have to be stupid
        const index = this.activeScene.findGameObjectIndexByCustomId(customId);
        if (index == null)
            return;
        const gameObject = this.activeScene.getUiElements()[index];
        this.activeScene.removeGameObjectByIndex(index);
        scene.addGameObject(gameObject);
    }
    update() {
        this.activeScene.update();
    }
    handleGameOver(id) {
        console.log('[SceneManager#handleGameOver]');
        if (this.scenes.length < 2)
            return;
        this.moveGameObjectToSceneByCustomId('catch-counter', this.scenes[1]);
        this.moveGameObjectToSceneByCustomId('stop-watch', this.scenes[1]);
        this.activeScene = this.scenes[1];
    }
}
