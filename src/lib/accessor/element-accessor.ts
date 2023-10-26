export default class ElementAccessor {

  // public static container: Element | null = document.querySelector('container');

  private static singleton: ElementAccessor;

  public static getInstance(): ElementAccessor {
    if (this.singleton == null) this.singleton = new ElementAccessor();

    return this.singleton;
  }

  public get(elementId: string): Element | null {
    return document.querySelector(`#${elementId}`);
  }
}
