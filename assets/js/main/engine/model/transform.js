export default class Transform {
    constructor(position) {
        this.position = position;
    }
    translate(value) {
        this.position = this.position.add(value);
    }
    toString() {
        return `pos=${this.position}`;
    }
}
