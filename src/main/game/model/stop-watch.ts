import EventSystem from '@/main/engine/event-system/event-system';
import Message from '@/main/engine/event-system/message';
import Subscription from '@/main/engine/event-system/subscription';
import { Topics } from '@/main/engine/event-system/topics';
import Animator from '@/main/engine/model/animator/animator';
import TextSprite from '@/main/engine/model/sprite/canvas/text-sprite';
import UiElement from '@/main/engine/model/ui-element/ui-element';
import TimeFormatter from '@/main/engine/time-formatter';

export default class StopWatch extends UiElement {

  private running: boolean;
  private startTime: number | null;

  public constructor(animator: Animator) {
    super(animator);

    this.running = false;
    this.startTime = null;

    EventSystem.getInstance()
      .getTopic(Topics.GameOver)
      ?.subscribe(new Subscription(
        this.id,
        (msg: Message) => this.handleGameOver(msg.getId())
      ));
  }

  public start(): void {
    this.startTime = Date.now();
    this.running = true;
  }

  public getElapsedTime(): number {
    if (this.startTime == null) return 0;

    return (Date.now() - this.startTime);
  }

  public getElapsedTimeFormatted(): string {
    return TimeFormatter.formatMilliseconds(this.getElapsedTime());
  }

  public handleGameOver(id: string): void {
    this.running = false;
  }

  public override update(): void {
    const textSprite: TextSprite = this.animator.getActiveSprite() as TextSprite;

    if (this.running) {
      textSprite.setContent(this.getElapsedTimeFormatted());
    }

    this.animator.render();
  }
}
