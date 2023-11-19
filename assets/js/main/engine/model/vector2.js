export default class Vector2 {
    static zero() {
        return new Vector2(0, 0);
    }
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(value) {
        return new Vector2((this.x + value.x), (this.y + value.y));
    }
    subtract(value) {
        return new Vector2((this.x - value.x), (this.y - value.y));
    }
    multiply(value) {
        return new Vector2((this.x * value.x), (this.y * value.y));
    }
    divide(value) {
        return new Vector2((this.x / value.x), (this.y / value.y));
    }
    addScalar(value) {
        return new Vector2((this.x + value), (this.y + value));
    }
    subtractScalar(value) {
        return new Vector2((this.x - value), (this.y - value));
    }
    multiplyScalar(value) {
        return new Vector2((this.x * value), (this.y * value));
    }
    divideScalar(value) {
        return new Vector2((this.x / value), (this.y / value));
    }
    magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    normalize() {
        const magnitude = this.magnitude();
        if (magnitude == 0)
            return Vector2.zero();
        return this.divideScalar(magnitude);
    }
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}
