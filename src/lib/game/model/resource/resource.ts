import Sprite from '@/lib/engine/model/sprite/sprite';
import Transform from '@/lib/engine/model/transform';
import GameObject from '@/lib/engine/model/game-object';
import Message from '@/lib/engine/event-system/message';
import EventSystem from '@/lib/engine/event-system/event-system';
import { Topics } from '@/lib/engine/event-system/topics';
import Subscription from '@/lib/engine/event-system/subscription';

export default class Resource extends GameObject {

  private readonly name: string;

  private readonly sellValue: number;

  constructor(
    transform: Transform,
    sprite: Sprite,
    name: string,
    sellValue: number
  ) {
    super(transform, sprite);

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
    console.log(`[Resource#collect] this.id=${this.id}, id=${id}`);
    if (id != this.id) return;

    console.log(`[Resource#collect] ${this.id} collected, disabling...`);
    this.enabled = false;

    EventSystem.getInstance()
      .getTopic(Topics.ResourceCollected)
      ?.publish(new Message(this.id));
  }

  public update(): void {
    if (!this.enabled) return;

    // throw Error('Override this method');
    this.spriteRenderer?.render();
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
