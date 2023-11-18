export default class Subscription {
    constructor(id, callback) {
        this.id = id;
        this.callback = callback;
    }
    getId() {
        return this.id;
    }
    getCallback() {
        return this.callback;
    }
}
