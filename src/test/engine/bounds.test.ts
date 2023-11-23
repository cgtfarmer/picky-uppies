import Bounds from '@/main/engine/model/bounds';
import Vector2 from '../../main/engine/model/vector2';

describe('getCenter', () => {

  test('given center=(0, 0), size=(10, 6), then results in (0, 0)', () => {
    const bounds: Bounds = new Bounds(Vector2.zero(), new Vector2(10, 6));

    const actual: Vector2 = bounds.getCenter();

    const expected: Vector2 = new Vector2(0, 0);

    expect(actual).toStrictEqual(expected);
  });
});

describe('getSize', () => {

  test('given center=(0, 0), size=(10, 6), then results in (10, 6)', () => {
    const bounds: Bounds = new Bounds(Vector2.zero(), new Vector2(10, 6));

    const actual: Vector2 = bounds.getSize();

    const expected: Vector2 = new Vector2(10, 6);

    expect(actual).toStrictEqual(expected);
  });
});

describe('getExtents', () => {

  test('given center=(0, 0), size=(10, 6), then results in (5, 3)', () => {
    const bounds: Bounds = new Bounds(Vector2.zero(), new Vector2(10, 6));

    const actual: Vector2 = bounds.getExtents();

    const expected: Vector2 = new Vector2(5, 3);

    expect(actual).toStrictEqual(expected);
  });
});

describe('getMin', () => {

  test('given center=(0, 0), size=(10, 6), then results in (-5, -3)', () => {
    const bounds: Bounds = new Bounds(Vector2.zero(), new Vector2(10, 6));

    const actual: Vector2 = bounds.getMin();

    const expected: Vector2 = new Vector2(-5, -3);

    expect(actual).toStrictEqual(expected);
  });
});

describe('getMax', () => {

  test('given center=(0, 0), size=(10, 6), then results in (5, 3)', () => {
    const bounds: Bounds = new Bounds(Vector2.zero(), new Vector2(10, 6));

    const actual: Vector2 = bounds.getMax();

    const expected: Vector2 = new Vector2(5, 3);

    expect(actual).toStrictEqual(expected);
  });
});
