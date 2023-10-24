import { Renderable } from '../interfaces/renderable';

export default class Scene implements Renderable {

  private readonly width: number;
  private readonly height: number;

  private renderables: Renderable[];

  public constructor(width: number, height: number, renderables: Renderable[]) {
    this.width = width;
    this.height = height;
    this.renderables = renderables;
  }

  public render() {
    this.renderables.forEach(e => e.render());
  }
}
