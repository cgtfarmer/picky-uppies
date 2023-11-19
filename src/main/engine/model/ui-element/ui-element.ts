import Animator from '../animator/animator';
import GameObject from '../game-object';

export default class UiElement extends GameObject {

  public constructor(animator: Animator) {
    super(animator);
  }

  public override update(): void {
    // console.log('[UiElement#update]');
    this.animator.render();
  }
}
