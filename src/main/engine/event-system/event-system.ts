import Topic from './topic';
import { Topics } from './topics';

export default class EventSystem {

  private static singleton: EventSystem;

  public static getInstance(): EventSystem {
    if (this.singleton == null) {
      this.singleton = new EventSystem();

      const topics: Map<Topics, Topic> = new Map<Topics, Topic>([
        [Topics.Interact, new Topic()],
        [Topics.ResourceCollected, new Topic()],
        [Topics.ChangeScene, new Topic()],
        [Topics.GameOver, new Topic()],
      ]);

      this.singleton.setTopics(topics);
    }

    return this.singleton;
  }

  private topics: Map<Topics, Topic>;

  public constructor() {
    this.topics = new Map<Topics, Topic>();
  }

  public addTopic(topicEntry: Topics, topic: Topic): void {
    this.topics.set(topicEntry, topic);
  }

  public deleteTopic(topicEntry: Topics): void {
    this.topics.delete(topicEntry);
  }

  public getTopic(topicEntry: Topics): Topic | undefined {
    return this.topics.get(topicEntry);
  }

  public setTopics(topics: Map<Topics, Topic>): void {
    this.topics = topics;
  }
}
