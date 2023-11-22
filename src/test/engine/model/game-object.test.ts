import GameObject from '@/main/engine/model/game-object';
import TestConstants from '@/test/TestConstants';

describe('when construct', () => {

  test('given customId is null, then constructs successfully', () => {
    const gameObject: GameObject = new GameObject(null, TestConstants.EMPTY_ARRAY);
  });

  test('given customId is blank, then throws Error', () => {
    expect(() => new GameObject(TestConstants.EMPTY_STRING, TestConstants.EMPTY_ARRAY))
      .toThrow(Error);
  });

  test('given customId is present, then constructs successfully', () => {
    const gameObject: GameObject = new GameObject(TestConstants.STRING, TestConstants.EMPTY_ARRAY);
  });

  test('given tags is empty, then constructs successfully', () => {
    const gameObject: GameObject = new GameObject(null, TestConstants.EMPTY_ARRAY);
  });
});
