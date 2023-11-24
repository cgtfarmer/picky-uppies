import GameObject from '../game-object';
import { Tag } from '../tag';

export default class UiElement extends GameObject {

  public constructor(customId: string, tags: Tag[]) {
    super(customId, tags);

    this.onClickHandler = null;
  }

  public override update(): void {
    this.animator?.render();
  }
}
