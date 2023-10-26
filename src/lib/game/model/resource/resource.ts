import { SpriteRenderer } from '@/lib/engine/model/sprite-renderer/sprite-renderer';
import Sprite from '@/lib/engine/model/sprite/sprite';
import Transform from '@/lib/engine/model/transform';
import UuidProvider from '@/lib/accessor/uuid-providor';

export default class Resource {

  private readonly id: string;

  private readonly transform: Transform;

  private readonly sprite: Sprite;

  private readonly spriteRenderer: SpriteRenderer;

  private readonly name: string;

  private readonly sellValue: number;

  constructor(
    transform: Transform,
    sprite: Sprite,
    spriteRenderer: SpriteRenderer,
    name: string,
    sellValue: number
  ) {
    this.id = UuidProvider.getRandom();
    this.transform = transform;
    this.sprite = sprite;
    this.spriteRenderer = spriteRenderer;
    this.name = name;
    this.sellValue = sellValue;
  }

  public update(): void {
    // throw Error('Override this method');
    this.spriteRenderer.render();
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
