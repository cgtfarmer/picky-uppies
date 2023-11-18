import EventSystem from '../../event-system/event-system.js';
import Message from '../../event-system/message.js';
import { Topics } from '../../event-system/topics.js';
import Game from '../game/game.js';
import Physics2D from '../physics-2d.js';
export default class Interact {
    constructor(castTime, radius) {
        this.castTime = castTime;
        this.radius = radius;
    }
    perform(position) {
        console.log('[Interact#perform]');
        // renderables: Renderable[] = Physics2D.OverlapCircle(
        //   position, this.radius, Game.getInstance().getActiveScene().getRenderables()
        // );
        const intersections = Physics2D.getInstance().overlapCircle(position, this.radius, Game.getInstance().getActiveScene().getResources());
        intersections.forEach((e) => {
            var _a;
            (_a = EventSystem.getInstance()
                .getTopic(Topics.Interact)) === null || _a === void 0 ? void 0 : _a.publish(new Message(e.id));
        });
        // emit 'interact' events on each one?
    }
}
