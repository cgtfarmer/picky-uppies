import Game from '../game/game.js';
export default class RigidBody2d {
    constructor() {
        this.gameObject = null;
    }
    setGameObject(gameObject) {
        this.gameObject = gameObject;
    }
    getPosition() {
        if (this.gameObject == null)
            return null;
        return this.gameObject.getTransform().position;
    }
    translate(delta) {
        // console.log(`[RigidBody2d#translate] delta=${delta}`);
        const displayTransformMatrix = Game.getInstance().getDisplayTransformMatrix();
        if (this.gameObject == null || displayTransformMatrix == null)
            return;
        const displayAdjustedDelta = delta.multiply(displayTransformMatrix);
        // console.log(`[RigidBody2d#translate] displayAdjustedDelta=${displayAdjustedDelta}`);
        this.gameObject.getTransform().translate(displayAdjustedDelta);
    }
    movePosition(position) {
        // if (this.gameObject == null) return;
        // this.gameObject.getTransform().translate(
        //   .scale(displayTransformMatrix);
        // this.transform.translate(this.velocity);
    }
}
