// type OnClickHandler = (event: MouseEvent) => void;

export default class BrowserGameClient {

  private canvas: HTMLCanvasElement | null;
  private xAxis: number;
  private yAxis: number;

  // private static keys: Map<string, boolean> = new Map<string, boolean>();
  private keys: Map<string, boolean>;

  // private onMouseDown: OnClickHandler | null;

  public constructor() {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      // TODO: Maybe just restrict default on space key?
      event.preventDefault();
      this.registerKey(event.key);
    });

    window.addEventListener('keyup', (event: KeyboardEvent) => {
      event.preventDefault();
      this.unregisterKey(event.key);
    });

    window.addEventListener('mousedown', (event: MouseEvent) => {
    });
      const rect: DOMRect = display.getHtmlCanvasElement().getBoundingClientRect();

      const clickPosition: Vector2 = new Vector2(
        (event.clientX - (rect.left + display.size().x)),
        (event.clientY - (rect.top + display.size().y))
      );
  }

  public setDisplay(display: Display): void {
    const canvasDisplay: CanvasDisplay = display as CanvasDisplay;
    this.canvas = canvasDisplay.getHtmlCanvasElement();

    window.addEventListener('mousedown', this.handleMouseDown);
  }

  public registerKey(key: string): void {
    // console.log(`[InputModule#registerKey] key=${key}`);

    this.keys.set(key, true);
  }

  public unregisterKey(key: string): void {
    // console.log(`[InputModule#unregisterKey] key=${key}`);

    this.keys.delete(key);
  }

  public getXAxis(): number {
    let value = 0;

    if (this.keys.has('a') || this.keys.has('ArrowLeft')) {
      value = -1;
    }

    if (this.keys.has('d') || this.keys.has('ArrowRight')) {
      value += 1;
    }

    // if (InputModule.keys.has('a')) value = -1;

    // if (InputModule.keys.has('d')) value += 1;

    return value;
  }

  public getYAxis(): number {
    let value = 0;

    if (this.keys.has('s') || this.keys.has('ArrowDown')) {
      value = -1;
    }

    if (this.keys.has('w') || this.keys.has('ArrowUp')) {
      value += 1;
    }

    // if (InputModule.keys.has('s')) value = -1;

    // if (InputModule.keys.has('w')) value += 1;

    return value;
  }

  public keyIsDown(key: string): boolean {
    return this.keys.has(key);
  }

  public getActiveKeys(): string[] {
    return Array.from(this.keys.keys());
  }

  public setOnMouseDown(callback: OnClickHandler): void {
    this.onMouseDown = callback;
  }

  public handleMouseDown(event: MouseEvent): void {
    console.log('[BrowserInputModule#handleMouseDown]');

    if (!this.onMouseDown) return;

    this.onMouseDown(event);
  }

  // private registerKey(event: KeyboardEvent): void {
  //   event.preventDefault();
  //   console.log(`[InputModule#registerKey] ${event.type}, ${event.key}, ${event.repeat}`);

  //   InputModule.keys.set(event.key, true);
  // }

  // private unregisterKey(event: KeyboardEvent): void {
  //   event.preventDefault();
  //   console.log(`[InputModule#unregisterKey] ${event.type}, ${event.key}, ${event.repeat}`);

  //   InputModule.keys.delete(event.key);
  // }

  // private handleKeypress(event: KeyboardEvent): void {
  //   event.preventDefault();
  //   // console.log(event.type);
  //   // console.log(event.code);
  //   console.log(`[InputModule#handleKeypress] ${event.type}, ${event.key}, ${event.repeat}`);

  //   InputModule.keys = new Map<string, boolean>();

  //   // if (event.type == 'keyup') this.keys.delete(event.code);
  //   // if (event.type == 'keyup') {
  //   //   InputModule.keys.delete(event.key);
  //   //   return;
  //   // }

  //   // this.keys.set(event.code, true);
  //   InputModule.keys.set(event.key, true);
  // }
}