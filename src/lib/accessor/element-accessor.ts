export default class ElementAccessor {

  private static singleton: ElementAccessor;

  public static getInstance(): ElementAccessor {
    if (this.singleton == null) this.singleton = new ElementAccessor();

    return this.singleton;
  }

  public get(elementId: string): Element | null {
    return document.querySelector(`#${elementId}`);
  }
}
