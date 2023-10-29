import Message from './message';

export default class Subscription {
  private id: string;
  // private callback: () => void;
  private callback: (msg: Message) => void;

  public constructor(id: string, callback: (msg: Message) => void) {
    this.id = id;
    this.callback = callback;
  }

  public getId(): string {
    return this.id;
  }

  public getCallback(): (msg: Message) => void {
    return this.callback;
  }
}
