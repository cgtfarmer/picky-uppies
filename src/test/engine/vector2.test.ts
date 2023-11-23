import Vector2 from '../../main/engine/model/vector2';
import TestConstants from '../TestConstants';

describe('add', () => {

  test('given (1, 1), when add (0, 0), then results in (1, 1)', () => {
    const initial: Vector2 = new Vector2(1, 1);

    const actual: Vector2 = initial.add(new Vector2(0, 0));

    const expected: Vector2 = new Vector2(1, 1);

    expect(actual).toStrictEqual(expected);
  });

  test('given (1, 1), when add (1, 1), then results in (2, 2)', () => {
    const initial: Vector2 = new Vector2(1, 1);

    const actual: Vector2 = initial.add(new Vector2(1, 1));

    const expected: Vector2 = new Vector2(2, 2);

    expect(actual).toStrictEqual(expected);
  });

  test('given (1, 1), when add (-1, -1), then results in (0, 0)', () => {
    const initial: Vector2 = new Vector2(1, 1);

    const actual: Vector2 = initial.add(new Vector2(-1, -1));

    const expected: Vector2 = new Vector2(0, 0);

    expect(actual).toStrictEqual(expected);
  });

  test('given (1, 1), when add (-2, -2), then results in (-1, -1)', () => {
    const initial: Vector2 = new Vector2(1, 1);

    const actual: Vector2 = initial.add(new Vector2(-2, -2));

    const expected: Vector2 = new Vector2(-1, -1);

    expect(actual).toStrictEqual(expected);
  });

  test('given (1, 1), when add (0, 1), then results in (1, 2)', () => {
    const initial: Vector2 = new Vector2(1, 1);

    const actual: Vector2 = initial.add(new Vector2(0, 1));

    const expected: Vector2 = new Vector2(1, 2);

    expect(actual).toStrictEqual(expected);
  });

  test('given (1, 1), when add (0, -1), then results in (1, 0)', () => {
    const initial: Vector2 = new Vector2(1, 1);

    const actual: Vector2 = initial.add(new Vector2(0, -1));

    const expected: Vector2 = new Vector2(1, 0);

    expect(actual).toStrictEqual(expected);
  });

  test('given (1, 1), when add (0, -2), then results in (1, -1)', () => {
    const initial: Vector2 = new Vector2(1, 1);

    const actual: Vector2 = initial.add(new Vector2(0, -2));

    const expected: Vector2 = new Vector2(1, -1);

    expect(actual).toStrictEqual(expected);
  });
});

describe('subtract', () => {

  test('given (1, 1), when subtract (1, 2), then results in (0, -1)', () => {
    const initial: Vector2 = new Vector2(1, 1);

    const actual: Vector2 = initial.subtract(new Vector2(1, 1));

    const expected: Vector2 = new Vector2(0, 0);

    expect(actual).toStrictEqual(expected);
  });
});

describe('multiply', () => {

  test('given (1, 2), when multiply (3, 2), then results in (3, 4)', () => {
    const initial: Vector2 = new Vector2(1, 1);

    const actual: Vector2 = initial.multiply(new Vector2(3, 2));

    const expected: Vector2 = new Vector2(3, 2);

    expect(actual).toStrictEqual(expected);
  });
});

describe('divide', () => {

  test('given (4, 6), when divide (2, 3), then results in (2, 2)', () => {
    const initial: Vector2 = new Vector2(4, 6);

    const actual: Vector2 = initial.divide(new Vector2(2, 3));

    const expected: Vector2 = new Vector2(2, 2);

    expect(actual).toStrictEqual(expected);
  });
});

describe('addScalar', () => {

  test('given (1, 2), when add 2, then results in (3, 4)', () => {
    const initial: Vector2 = new Vector2(1, 2);

    const actual: Vector2 = initial.addScalar(2);

    const expected: Vector2 = new Vector2(3, 4);

    expect(actual).toStrictEqual(expected);
  });
});

describe('subtractScalar', () => {

  test('given (1, 2), when subtract 2, then results in (-1, 0)', () => {
    const initial: Vector2 = new Vector2(1, 2);

    const actual: Vector2 = initial.subtractScalar(2);

    const expected: Vector2 = new Vector2(-1, 0);

    expect(actual).toStrictEqual(expected);
  });
});

describe('multiplyScalar', () => {

  test('given (1, 2), when multiply by 3, then results in (3, 6)', () => {
    const initial: Vector2 = new Vector2(1, 2);

    const actual: Vector2 = initial.multiplyScalar(3);

    const expected: Vector2 = new Vector2(3, 6);

    expect(actual).toStrictEqual(expected);
  });
});

describe('divideScalar', () => {

  test('given (4, 6), when divide by 2, then results in (2, 3)', () => {
    const initial: Vector2 = new Vector2(4, 6);

    const actual: Vector2 = initial.divideScalar(2);

    const expected: Vector2 = new Vector2(2, 3);

    expect(actual).toStrictEqual(expected);
  });
});

describe('magnitude', () => {

  test('given (2, 1), then results in sqrt(5)', () => {
    const initial: Vector2 = new Vector2(2, 1);

    const actual: number = initial.magnitude();

    const expected: number = Math.sqrt(5);

    expect(actual).toBe(expected);
  });
});

describe('normalize', () => {

  test('given (3, 2), then results in (3/magnitude, 2/magnitude)', () => {
    const initial: Vector2 = new Vector2(3, 2);

    const magnitude: number = initial.magnitude();

    const actual: Vector2 = initial.normalize();

    const expected: Vector2 = new Vector2((3 / magnitude), (2 / magnitude));

    expect(actual).toStrictEqual(expected);
  });
});
