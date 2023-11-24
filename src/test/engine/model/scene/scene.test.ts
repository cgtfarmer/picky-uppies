import Bounds from '@/main/engine/model/bounds';
import GameObject from '@/main/engine/model/game-object';
import Scene from '@/main/engine/model/scene/scene';
import { Tag } from '@/main/engine/model/tag';
import Vector2 from '@/main/engine/model/vector2';
import TestConstants from '@/test/TestConstants';

describe('constructor', () => {

  test('given bounds, then constructs successfully', () => {
    const bounds: Bounds = new Bounds(
      Vector2.zero(),
      new Vector2(1360, 765)
    );

    const scene: Scene = new Scene(bounds);
  });
});

describe('getGameObjectsByTag', () => {

  test('given tag is not present, then returns empty array', () => {
    const bounds: Bounds = new Bounds(
      Vector2.zero(),
      new Vector2(1360, 765)
    );

    const scene: Scene = new Scene(bounds);

    const gameObject1: GameObject = new GameObject('TEST1', []);
    const gameObject2: GameObject = new GameObject('TEST2', []);
    const gameObject3: GameObject = new GameObject('TEST3', []);

    scene.addGameObject(gameObject1);
    scene.addGameObject(gameObject2);
    scene.addGameObject(gameObject3);

    expect(scene.getGameObjectsByTag(Tag.Player))
      .toStrictEqual([]);
  });

  test('given tag is present, then returns populated array', () => {
    const bounds: Bounds = new Bounds(
      Vector2.zero(),
      new Vector2(1360, 765)
    );

    const scene: Scene = new Scene(bounds);

    const gameObject1: GameObject = new GameObject('TEST1', [Tag.Player]);
    const gameObject2: GameObject = new GameObject('TEST2', [Tag.Enemy]);
    const gameObject3: GameObject = new GameObject('TEST3', [Tag.Enemy]);

    scene.addGameObject(gameObject1);
    scene.addGameObject(gameObject2);
    scene.addGameObject(gameObject3);

    expect(scene.getGameObjectsByTag(Tag.Player))
      .toStrictEqual([gameObject1]);
  });
});

describe('addGameObject', () => {

  test('given GameObject, then adds successfully', () => {
    const gameObject: GameObject = new GameObject(TestConstants.STRING, TestConstants.EMPTY_ARRAY);

    const bounds: Bounds = new Bounds(
      Vector2.zero(),
      new Vector2(1360, 765)
    );

    const scene: Scene = new Scene(bounds);

    scene.addGameObject(gameObject);

    expect(scene.getGameObjects().includes(gameObject))
      .toBeTruthy();
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

describe('deleteGameObject', () => {

  test('given GameObject is present, then deletes successfully', () => {
    const bounds: Bounds = new Bounds(
      Vector2.zero(),
      new Vector2(1360, 765)
    );

    const scene: Scene = new Scene(bounds);

    const gameObject1: GameObject = new GameObject('TEST1', TestConstants.EMPTY_ARRAY);
    const gameObject2: GameObject = new GameObject('TEST2', TestConstants.EMPTY_ARRAY);
    const gameObject3: GameObject = new GameObject('TEST3', TestConstants.EMPTY_ARRAY);

    scene.addGameObject(gameObject1);
    scene.addGameObject(gameObject2);
    scene.addGameObject(gameObject3);

    scene.deleteGameObject(gameObject2);

    expect(scene.getGameObjects().length)
      .toBe(2);

    expect(scene.getGameObjects()[0])
      .toBe(gameObject1);

    expect(scene.getGameObjects()[1])
      .toBe(gameObject3);
  });

  test('given GameObject is not present, then does nothing', () => {
    const bounds: Bounds = new Bounds(
      Vector2.zero(),
      new Vector2(1360, 765)
    );

    const scene: Scene = new Scene(bounds);

    const gameObject1: GameObject = new GameObject('TEST1', TestConstants.EMPTY_ARRAY);
    const gameObject2: GameObject = new GameObject('TEST2', TestConstants.EMPTY_ARRAY);
    const gameObject3: GameObject = new GameObject('TEST3', TestConstants.EMPTY_ARRAY);

    scene.addGameObject(gameObject1);
    scene.addGameObject(gameObject3);

    scene.deleteGameObject(gameObject2);

    expect(scene.getGameObjects().length)
      .toBe(2);

    expect(scene.getGameObjects()[0])
      .toBe(gameObject1);

    expect(scene.getGameObjects()[1])
      .toBe(gameObject3);
  });
});
