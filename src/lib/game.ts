export default class Game {

  private static singleton: Game;

  private containerId: string;

  private canvasId: string;

  public static getInstance(containerId: string): Game {
    if (this.singleton == null) this.singleton = new Game(containerId);

    return this.singleton;
  }

  public constructor(containerId: string) {
    this.containerId = containerId;
    this.canvasId = 'canvas';

    console.log(`Meow? ${this.containerId}`);

    const container: Element | null = document.querySelector(`#${this.containerId}`);

    if (!container) return;

    container.insertAdjacentHTML('beforeend', `
      <canvas id="${this.canvasId}" width="1360" height="765" style="background-color: #888888;">
      </canvas>
    `);
  }
}
