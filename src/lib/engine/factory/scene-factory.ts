import ResourceFactory from '@/lib/game/factory/resource-factory';
import Player from '../../game/model/character/player';
import Scene from '../model/scene';
import Display from '../model/display/display';

export default class SceneFactory {

  private static singleton: SceneFactory;

  private readonly resourceFactory: ResourceFactory;

  public static getInstance(display: Display): SceneFactory {
    if (this.singleton == null) {
      this.singleton = new SceneFactory(ResourceFactory.getInstance(display));
    }

    return this.singleton;
  }

  public constructor(resourceFactory: ResourceFactory) {
    this.resourceFactory = resourceFactory;
  }

  public createScenes(player: Player): Scene[] {
    return [
      this.createOneOne(player),
    ];
  }

  public createOneOne(player: Player): Scene {
    return new Scene(1360, 765, [
      player,
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
