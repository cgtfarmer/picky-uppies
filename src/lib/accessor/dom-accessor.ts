export default class DomAccessor {

  // public static container: Element | null = document.querySelector('container');

  private static singleton: DomAccessor;

  public static getInstance(): DomAccessor {
    if (this.singleton == null) this.singleton = new DomAccessor();

    return this.singleton;
  }

  public get(elementId: string): Element | null {
    return document.querySelector(`#${elementId}`);
  }

  public createCanvas(): HTMLCanvasElement {
    return document.createElement('canvas');
  }
}
