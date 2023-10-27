import { InputModule } from './input-module';

export default class BrowserInputModule implements InputModule {

  private xAxis: number;
  private yAxis: number;

  // private static keys: Map<string, boolean> = new Map<string, boolean>();
  private keys: Map<string, boolean>;

  public constructor() {
    this.xAxis = 0;
    this.yAxis = 0;
    this.keys = new Map<string, boolean>();

    // window.addEventListener('keypress', this.handleKeypress);

    window.addEventListener('keydown', (event) => {
      event.preventDefault();
      this.registerKey(event.key);
    });

    window.addEventListener('keyup', (event) => {
      event.preventDefault();
      this.unregisterKey(event.key);
    });
  }

  public registerKey(key: string): void {
    console.log(`[InputModule#registerKey] key=${key}`);

    this.keys.set(key, true);
  }

  public unregisterKey(key: string): void {
    console.log(`[InputModule#unregisterKey] key=${key}`);

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
