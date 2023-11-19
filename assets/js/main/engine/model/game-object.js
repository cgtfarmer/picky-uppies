import Transform from './transform.js';
import UuidProvider from '/picky-uppies/assets/js/main/engine/uuid-provider.js';
import Vector2 from './vector2.js';
export default class GameObject {
    constructor(animator) {
        this.id = UuidProvider.getRandom();
        this.enabled = true;
        this.scene = null;
        this.transform = new Transform(Vector2.zero());
        this.animator = animator;
        this.animator.setGameObject(this);
        this.rigidBody = null;
        this.customId = null;
    }
    getScene() {
        return this.scene;
    }
    getTransform() {
        return this.transform;
    }
    getRigidbody() {
        return this.rigidBody;
    }
    setScene(scene) {
        this.scene = scene;
    }
    setDisplay(display) {
        this.animator.setDisplay(display);
    }
    setRigidBody(rigidBody) {
        this.rigidBody = rigidBody;
        this.rigidBody.setGameObject(this);
    }
    setCustomId(customId) {
        this.customId = customId;
    }
    // public setSpriteRenderer(spriteRenderer: SpriteRenderer): void {
    //   this.spriteRenderer = spriteRenderer;
    //   this.spriteRenderer.setGameObject(this);
    // }
    update() {
        throw Error('Implement override');
    }
}
