export default class Physics2D {
    static getInstance() {
        if (this.singleton == null)
            this.singleton = new Physics2D();
        return this.singleton;
    }
    overlapCircle(position, radius, gameObjects) {
        return gameObjects.filter((o) => {
            return this.pointIntersectsCircle(position, radius, o.getTransform().position);
        });
    }
    pointIntersectsCircle(center, radius, point) {
        const difference = point.subtract(center);
        const magnitude = difference.magnitude();
        if (magnitude <= radius)
            return true;
        return false;
    }
}
