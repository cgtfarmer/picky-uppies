import Topic from './topic.js';
import { Topics } from './topics.js';
export default class EventSystem {
    static getInstance() {
        if (this.singleton == null) {
            const topics = new Map([
                [Topics.Interact, new Topic()],
                [Topics.ResourceCollected, new Topic()],
            ]);
            this.singleton = new EventSystem(topics);
        }
        return this.singleton;
    }
    constructor(topics) {
        this.topics = topics;
    }
    getTopic(topicEntry) {
        return this.topics.get(topicEntry);
    }
}
