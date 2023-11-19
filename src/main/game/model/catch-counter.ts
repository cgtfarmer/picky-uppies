import EventSystem from '@/main/engine/event-system/event-system';
import Message from '@/main/engine/event-system/message';
import Subscription from '@/main/engine/event-system/subscription';
import { Topics } from '@/main/engine/event-system/topics';
import Animator from '@/main/engine/model/animator/animator';
import TextSprite from '@/main/engine/model/sprite/canvas/text-sprite';
import UiElement from '@/main/engine/model/ui-element/ui-element';

export default class CatchCounter extends UiElement {

  private counter: number;

  private maxCounter: number;

  public constructor(animator: Animator, maxCounter: number) {
    super(animator);

    this.counter = 0;
    this.maxCounter = maxCounter;

    EventSystem.getInstance()
      .getTopic(Topics.ResourceCollected)
      ?.subscribe(new Subscription(
        this.id,
        (msg: Message) => this.handleResourceCollected(msg.getId())
      ));
  }

  public handleResourceCollected(id: string): void {
    const textSprite: TextSprite = this.animator.getActiveSprite() as TextSprite;

    this.counter += 1;

    console.log(`[CatchCounter#handleResourceCollected] ${this}`);

    textSprite.setContent(`${this.counter} / ${this.maxCounter}`);

    if (this.counter >= this.maxCounter) {
      console.log('[CatchCounter#handleResourceCollected] emitting GameOver event');
      EventSystem.getInstance()
        .getTopic(Topics.GameOver)
        ?.publish(new Message(this.id));
    }
  }

  public override toString(): string {
    return `CatchCounter: counter=${this.counter}, maxCounter=${this.maxCounter}`;
  }
}
