import EventSystem from '/picky-uppies/assets/js/main/engine/event-system/event-system.js';
import Message from '/picky-uppies/assets/js/main/engine/event-system/message.js';
import Subscription from '/picky-uppies/assets/js/main/engine/event-system/subscription.js';
import { Topics } from '/picky-uppies/assets/js/main/engine/event-system/topics.js';
import UiElement from '/picky-uppies/assets/js/main/engine/model/ui-element/ui-element.js';
export default class CatchCounter extends UiElement {
    constructor(animator, maxCounter) {
        var _a;
        super(animator);
        this.counter = 0;
        this.maxCounter = maxCounter;
        (_a = EventSystem.getInstance()
            .getTopic(Topics.ResourceCollected)) === null || _a === void 0 ? void 0 : _a.subscribe(new Subscription(this.id, (msg) => this.handleResourceCollected(msg.getId())));
    }
    handleResourceCollected(id) {
        var _a;
        const textSprite = this.animator.getActiveSprite();
        this.counter += 1;
        console.log(`[CatchCounter#handleResourceCollected] ${this}`);
        textSprite.setContent(`${this.counter} / ${this.maxCounter}`);
        if (this.counter >= this.maxCounter) {
            console.log('[CatchCounter#handleResourceCollected] emitting GameOver event');
            (_a = EventSystem.getInstance()
                .getTopic(Topics.GameOver)) === null || _a === void 0 ? void 0 : _a.publish(new Message(this.id));
        }
    }
    toString() {
        return `CatchCounter: counter=${this.counter}, maxCounter=${this.maxCounter}`;
    }
}
