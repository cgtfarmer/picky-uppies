import Rng from './rng.js';
import Vector2 from './vector2.js';
export default class Bounds {
    constructor(center, size) {
        this.center = center;
        this.extents = size.multiply(0.5);
        this.size = size;
        this.max = this.center.add(this.extents);
        this.min = this.center.subtract(this.extents);
    }
    getCenter() {
        return this.center;
    }
    getSize() {
        // return this.extents.multiply(2);
        return this.size;
    }
    // public getExtents(): Vector2 {
    //   return this.extents;
    // }
    getMin() {
        // return this.center.subtract(this.extents);
        return this.min;
    }
    getMax() {
        // return this.center.add(this.extents);
        return this.max;
    }
    getRandomPoint() {
        const rng = Rng.getInstance();
        return new Vector2(rng.getRandomInt(this.min.x, this.max.x), rng.getRandomInt(this.min.y, this.max.y));
    }
}
