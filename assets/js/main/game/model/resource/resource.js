import GameObject from '/picky-uppies/assets/js/main/engine/model/game-object.js';
import Message from '/picky-uppies/assets/js/main/engine/event-system/message.js';
import EventSystem from '/picky-uppies/assets/js/main/engine/event-system/event-system.js';
import { Topics } from '/picky-uppies/assets/js/main/engine/event-system/topics.js';
import Subscription from '/picky-uppies/assets/js/main/engine/event-system/subscription.js';
export default class Resource extends GameObject {
    constructor(animator, name, sellValue) {
        var _a;
        super(animator);
        this.name = name;
        this.sellValue = sellValue;
        (_a = EventSystem.getInstance()
            .getTopic(Topics.Interact)) === null || _a === void 0 ? void 0 : _a.subscribe(new Subscription(this.id, (msg) => this.collect(msg.getId())));
    }
    collect(id) {
        var _a;
        // console.log(`[Resource#collect] this.id=${this.id}, id=${id}`);
        if (id != this.id)
            return;
        console.log(`[Resource#collect] ${this.id} collected, disabling...`);
        this.enabled = false;
        (_a = EventSystem.getInstance()
            .getTopic(Topics.ResourceCollected)) === null || _a === void 0 ? void 0 : _a.publish(new Message(this.id));
    }
    update() {
        if (!this.enabled)
            return;
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
