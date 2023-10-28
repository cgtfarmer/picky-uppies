import ResourceFactory from '@/lib/game/model/resource/resource-factory';
import Scene from './scene';

export default class SceneFactory {

  private static singleton: SceneFactory;

  private readonly resourceFactory: ResourceFactory;

  public static getInstance(): SceneFactory {
    if (this.singleton == null) {
      const resourceFactory = ResourceFactory.getInstance();
      this.singleton = new SceneFactory(resourceFactory);
    }

    return this.singleton;
  }

  public constructor(resourceFactory: ResourceFactory) {
    this.resourceFactory = resourceFactory;
  }

  public createScenes(): Scene[] {
    return [
      this.createOneOne(),
    ];
  }

  public createOneOne(): Scene {
    return new Scene(1360, 765, [
      this.resourceFactory.createPrometium(0, 50),
      this.resourceFactory.createPrometium(0, 100),
      this.resourceFactory.createPrometium(0, 150),
      this.resourceFactory.createPrometium(0, 200),
      this.resourceFactory.createPrometium(0, 250),
      this.resourceFactory.createEndurium(100, 50),
      this.resourceFactory.createEndurium(100, 100),
      this.resourceFactory.createEndurium(100, 150),
      this.resourceFactory.createEndurium(100, 200),
      this.resourceFactory.createEndurium(100, 250),
      this.resourceFactory.createTerbium(200, 50),
      this.resourceFactory.createTerbium(200, 100),
      this.resourceFactory.createTerbium(200, 150),
      this.resourceFactory.createTerbium(200, 200),
      this.resourceFactory.createTerbium(200, 250),
    ]);
  }
}
