import ResourceFactory from '@/lib/game/model/resource/resource-factory';
import Scene from './scene';
import ResourceSpawnEngine from '@/lib/game/model/resource/resource-spawn-engine';

export default class SceneFactory {

  private static singleton: SceneFactory;

  public static getInstance(): SceneFactory {
    if (this.singleton == null) {
      this.singleton = new SceneFactory();
    }

    return this.singleton;
  }

  public createScenes(): Scene[] {
    return [
      this.createOneOne(),
    ];
  }

  public createOneOne(): Scene {
    // return new Scene(1360, 765, [], [
    //   this.resourceFactory.createPrometium(0, 50),
    //   this.resourceFactory.createPrometium(0, 100),
    //   this.resourceFactory.createPrometium(0, 150),
    //   this.resourceFactory.createPrometium(0, 200),
    //   this.resourceFactory.createPrometium(0, 250),
    //   this.resourceFactory.createEndurium(100, 50),
    //   this.resourceFactory.createEndurium(100, 100),
    //   this.resourceFactory.createEndurium(100, 150),
    //   this.resourceFactory.createEndurium(100, 200),
    //   this.resourceFactory.createEndurium(100, 250),
    //   this.resourceFactory.createTerbium(200, 50),
    //   this.resourceFactory.createTerbium(200, 100),
    //   this.resourceFactory.createTerbium(200, 150),
    //   this.resourceFactory.createTerbium(200, 200),
    //   this.resourceFactory.createTerbium(200, 250),
    // ]);

    const scene: Scene = new Scene(1360, 765, [], []);

    const resourceFactory = ResourceFactory.getInstance();
    const resourceSpawnEngine: ResourceSpawnEngine =
      new ResourceSpawnEngine(resourceFactory, 100);
    scene.setResourceSpawnEngine(resourceSpawnEngine);

    return scene;
  }
}
