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
    magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    multiply(value) {
        return new Vector2((this.x * value), (this.y * value));
    }
    scale(value) {
        return new Vector2((this.x * value.x), (this.y * value.y));
    }
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}
