import Animator from '../animator/animator';
import GameObject from '../game-object';

type OnClickHandler = () => void;

export default class UiElement extends GameObject {

  private onClickHandler: OnClickHandler | null;

  public constructor(animator: Animator) {
    super(animator);

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
    this.animator.render();
  }
}
