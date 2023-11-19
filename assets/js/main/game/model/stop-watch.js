import EventSystem from '/picky-uppies/assets/js/main/engine/event-system/event-system.js';
import Subscription from '/picky-uppies/assets/js/main/engine/event-system/subscription.js';
import { Topics } from '/picky-uppies/assets/js/main/engine/event-system/topics.js';
import UiElement from '/picky-uppies/assets/js/main/engine/model/ui-element/ui-element.js';
import TimeFormatter from '/picky-uppies/assets/js/main/engine/time-formatter.js';
export default class StopWatch extends UiElement {
    constructor(animator) {
        var _a;
        super(animator);
        this.running = false;
        this.startTime = null;
        (_a = EventSystem.getInstance()
            .getTopic(Topics.GameOver)) === null || _a === void 0 ? void 0 : _a.subscribe(new Subscription(this.id, (msg) => this.handleGameOver(msg.getId())));
    }
    start() {
        this.startTime = Date.now();
        this.running = true;
    }
    getElapsedTime() {
        if (this.startTime == null)
            return 0;
        return (Date.now() - this.startTime);
    }
    getElapsedTimeFormatted() {
        return TimeFormatter.formatMilliseconds(this.getElapsedTime());
    }
    handleGameOver(id) {
        this.running = false;
    }
    update() {
        const textSprite = this.animator.getActiveSprite();
        if (this.running) {
            textSprite.setContent(this.getElapsedTimeFormatted());
        }
        this.animator.render();
    }
}
