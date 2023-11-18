export default class RigidBody2d {
    constructor(transform) {
        this.transform = transform;
    }
    movePosition(position) {
        this.transform.position = position;
    }
}
