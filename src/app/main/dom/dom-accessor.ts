export default class DomAccessor {

  private static singleton: DomAccessor;

  public static getInstance(): DomAccessor {
    if (this.singleton == null) this.singleton = new DomAccessor();

    return this.singleton;
  }

  public get(elementId: string): Element | null {
    return document.querySelector(`#${elementId}`);
  }

  public append(elementId: string, element: Element): void {
    const containerElement: Element | null = this.get(elementId);

    if (containerElement == null) return;

    containerElement.insertAdjacentElement('beforeend', element);
  }
}
