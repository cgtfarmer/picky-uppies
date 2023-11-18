import Vector2 from './vector2.js';
export default class Rng {
    static getInstance() {
        if (this.singleton == null)
            this.singleton = new Rng();
        return this.singleton;
    }
    /**
     * Get a random int within provided range.
     *
     * @param start start of range
     * @param end end of range (inclusive)
     * @returns random number
     */
    getRandomInt(start, end) {
        if (end < start)
            throw new Error('Invalid range: end must not be less than start');
        if (start == end) {
            return Math.floor(Math.random() * (end - start)) + start;
        }
        return Math.floor(Math.random() * (end - start + 1)) + start;
    }
    getRandomPoint(bounds) {
        return Vector2.zero();
    }
}
