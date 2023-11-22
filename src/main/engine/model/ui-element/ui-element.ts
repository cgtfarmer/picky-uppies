import Animator from '../animator/animator';
import GameObject from '../game-object';
import { Tag } from '../tag';

type OnClickHandler = () => void;

export default class UiElement extends GameObject {

  private onClickHandler: OnClickHandler | null;

  public constructor(customId: string, tags: Tag[]) {
    super(customId, tags);

    this.onClickHandler = null;
  }

  public setOnClickHandler(onClickHandler: OnClickHandler): void {
    this.onClickHandler = onClickHandler;
  }

  public onClick(): void {
    if (this.onClickHandler == null) return;

    this.onClickHandler();
  }

  public override update(): void {
    // console.log('[UiElement#update]');
    this.animator?.render();
  }
}
