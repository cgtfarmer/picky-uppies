import Player from '../../game/models/player';
import Scene from '../model/scene';

export default class SceneFactory {

  private static singleton: SceneFactory;

  public static getInstance(): SceneFactory {
    if (this.singleton == null) this.singleton = new SceneFactory();

    return this.singleton;
  }

  public createScenes(player: Player): Scene[] {
    return [
      this.createOneOne(player),
    ];
  }

  public createOneOne(player: Player): Scene {
    return new Scene(1360, 765, [player]);
  }
}
