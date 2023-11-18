import Transform from './transform.js';
import UuidProvider from '/assets/js/main/engine/uuid-provider.js';
import Vector2 from './vector2.js';
export default class GameObject {
    constructor(animator) {
        this.id = UuidProvider.getRandom();
        this.enabled = true;
        this.scene = null;
        this.transform = new Transform(Vector2.zero());
        this.animator = animator;
        this.animator.setGameObject(this);
    }
    getScene() {
        return this.scene;
    }
    getTransform() {
        return this.transform;
    }
    setScene(scene) {
        this.scene = scene;
    }
    setDisplay(display) {
        var _a;
        (_a = this.animator) === null || _a === void 0 ? void 0 : _a.setDisplay(display);
    }
    // public setSpriteRenderer(spriteRenderer: SpriteRenderer): void {
    //   this.spriteRenderer = spriteRenderer;
    //   this.spriteRenderer.setGameObject(this);
    // }
    update() {
        throw Error('Implement override');
    }
}
