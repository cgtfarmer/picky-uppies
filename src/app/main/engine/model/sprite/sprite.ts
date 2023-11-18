export default abstract class Sprite {
  private type: string;

  public constructor(type: string) {
    this.type = type;
  }

  public getType(): string {
    return this.type;
  }
}
