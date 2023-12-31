import Sprite from '@/main/engine/model/sprite/sprite';
import Transform from '@/main/engine/model/transform';
import GameObject from '@/main/engine/model/game-object';
import Message from '@/main/engine/event-system/message';
import EventSystem from '@/main/engine/event-system/event-system';
import { Topics } from '@/main/engine/event-system/topics';
import Subscription from '@/main/engine/event-system/subscription';
import Animator from '@/main/engine/model/animator/animator';

export default class Resource extends GameObject {

  private readonly name: string;

  private readonly sellValue: number;

  constructor(
    animator: Animator,
    name: string,
    sellValue: number
  ) {
    super(animator);

    this.name = name;
    this.sellValue = sellValue;

    EventSystem.getInstance()
      .getTopic(Topics.Interact)
      ?.subscribe(new Subscription(
        this.id,
        (msg: Message) => this.collect(msg.getId())
      ));
  }

  public collect(id: string) {
    // console.log(`[Resource#collect] this.id=${this.id}, id=${id}`);
    if (id != this.id) return;

    console.log(`[Resource#collect] ${this.id} collected, disabling...`);
    this.enabled = false;

    EventSystem.getInstance()
      .getTopic(Topics.ResourceCollected)
      ?.publish(new Message(this.id));
  }

  public override update(): void {
    if (!this.enabled) return;

    // throw Error('Override this method');
    this.animator.render();
  }
}

// render() {
//   this.sprite.render();

//   // game.ctx.beginPath();
//   // game.ctx.lineWidth = 0.5;
//   // game.ctx.strokeStyle = '#000000';
//   // game.ctx.fillStyle = this.color;
//   // game.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
//   // game.ctx.fill();
//   // game.ctx.stroke();
// }

// class Prometium extends Resource {
//   constructor(x, y) {
//     super(x, y, 'red', 10);
//   }
// }

// class Endurium extends Resource {
//   constructor(x, y) {
//     super(x, y, 'blue', 15);
//   }
// }

// class Terbium extends Resource {
//   constructor(x, y) {
//     super(x, y, 'yellow', 20);
//   }
// }
