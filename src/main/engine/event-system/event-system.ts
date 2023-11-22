import Topic from './topic';
import { Topics } from './topics';

export default class EventSystem {

  private static singleton: EventSystem;

  public static getInstance(): EventSystem {
    if (this.singleton == null) {
      const topics: Map<Topics, Topic> = new Map<Topics, Topic>([
        [Topics.Interact, new Topic()],
        [Topics.ResourceCollected, new Topic()],
        [Topics.ChangeScene, new Topic()],
        [Topics.GameOver, new Topic()],
      ]);

      this.singleton = new EventSystem(topics);
    }

    return this.singleton;
  }

  private topics: Map<Topics, Topic>;

  public constructor(topics: Map<Topics, Topic>) {
    this.topics = topics;
  }

  public getTopic(topicEntry: Topics): Topic | undefined {
    return this.topics.get(topicEntry);
  }
}
