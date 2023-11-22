import Bounds from '@/main/engine/model/bounds';
import GameObject from '@/main/engine/model/game-object';
import Scene from '@/main/engine/model/scene/scene';
import Vector2 from '@/main/engine/model/vector2';
import TestConstants from '@/test/TestConstants';

describe('when construct', () => {

  test('given bounds, then constructs successfully', () => {
    const bounds: Bounds = new Bounds(
      Vector2.zero(),
      new Vector2(1360, 765)
    );

    const scene: Scene = new Scene(bounds);
  });
});

describe('when addGameObject', () => {

  test('given GameObject, then adds successfully', () => {
    const gameObject: GameObject = new GameObject(TestConstants.STRING, TestConstants.EMPTY_ARRAY);

    const bounds: Bounds = new Bounds(
      Vector2.zero(),
      new Vector2(1360, 765)
    );

    const scene: Scene = new Scene(bounds);

    scene.addGameObject(gameObject);

    expect(scene.getGameObjects().includes(gameObject))
      .toBe(true);
  });

  test('given GameObject, then sets GameObject scene property', () => {
    const gameObject: GameObject = new GameObject(TestConstants.STRING, TestConstants.EMPTY_ARRAY);

    const bounds: Bounds = new Bounds(
      Vector2.zero(),
      new Vector2(1360, 765)
    );

    const scene: Scene = new Scene(bounds);

    scene.addGameObject(gameObject);

    expect(gameObject.getScene())
      .toBe(scene);
  });
});
