export default class Rng {

  private static singleton: Rng;

  public static getInstance(): Rng {
    if (this.singleton == null) this.singleton = new Rng();

    return this.singleton;
  }

  public getRandomInt(start: number, end: number): number {
    return Math.floor(Math.random() * (end + 1)) + start;
  }
}
