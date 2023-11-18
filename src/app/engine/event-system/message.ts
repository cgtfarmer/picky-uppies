export default class Message {
  private id: string;

  public constructor(id: string) {
    this.id = id;
  }

  public getId(): string {
    return this.id;
  }
}
