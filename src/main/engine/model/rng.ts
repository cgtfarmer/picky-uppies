import Bounds from './bounds';
import Vector2 from './vector2';

export default class Rng {

  private static singleton: Rng;

  public static getInstance(): Rng {
    if (this.singleton == null) this.singleton = new Rng();

    return this.singleton;
  }

  /**
   * Get a random int within provided range.
   *
   * @param start start of range
   * @param end end of range (inclusive)
   * @returns random number
   */
  public getRandomInt(start: number, end: number): number {
    if (end < start) throw new Error('Invalid range: end must not be less than start');

    if (start == end) return start;

    return Math.floor(Math.random() * (end - start + 1)) + start;
  }

  public getRandomPoint(bounds: Bounds): Vector2 {
    return Vector2.zero();
  }
}
