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

    if (start == end) {
      return Math.floor(Math.random() * (end - start)) + start;
    }

    return Math.floor(Math.random() * (end - start + 1)) + start;
  }
}
