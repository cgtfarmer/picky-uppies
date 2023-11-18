import Bounds from '../../main/engine/model/bounds.js';
import Rng from '../../main/engine/model/rng.js';
import Vector2 from '../../main/engine/model/vector2.js';

describe('when get random int', () => {

  test('given end is less than start, then throws error', () => {
    expect(() => Rng.getInstance().getRandomInt(1, 0))
      .toThrow(Error);
  });

  test('given range of 0 to 0, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(0, 0);
    expect(results.size).toBe(1);

    const result0 = results.get(0);
    expect(result0 && result0 >= 1).toBe(true);
  });

  test('given range of 0 to 1, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(0, 1);
    expect(results.size).toBe(2);

    const result0 = results.get(0);
    const result1 = results.get(1);
    expect(result0 && result0 >= 1).toBe(true);
    expect(result1 && result1 >= 1).toBe(true);
  });

  test('given range of 0 to 2, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(0, 2);
    expect(results.size).toBe(3);

    const result0 = results.get(0);
    const result1 = results.get(1);
    const result2 = results.get(2);
    expect(result0 && result0 >= 1).toBe(true);
    expect(result1 && result1 >= 1).toBe(true);
    expect(result2 && result2 >= 1).toBe(true);
  });

  test('given range of 1 to 1, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(1, 1);
    expect(results.size).toBe(1);

    const result1 = results.get(1);
    expect(result1 && result1 >= 1).toBe(true);
  });

  test('given range of 1 to 2, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(1, 2);
    expect(results.size).toBe(2);

    const result1 = results.get(1);
    const result2 = results.get(2);
    expect(result1 && result1 >= 1).toBe(true);
    expect(result2 && result2 >= 1).toBe(true);
  });

  test('given range of 1 to 3, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(1, 3);
    expect(results.size).toBe(3);

    const result1 = results.get(1);
    const result2 = results.get(2);
    const result3 = results.get(3);
    expect(result1 && result1 >= 1).toBe(true);
    expect(result2 && result2 >= 1).toBe(true);
    expect(result3 && result3 >= 1).toBe(true);
  });

  test('given range of 2 to 2, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(2, 2);
    expect(results.size).toBe(1);

    const result2 = results.get(2);
    expect(result2 && result2 >= 1).toBe(true);
  });

  test('given range of 2 to 3, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(2, 3);
    expect(results.size).toBe(2);

    const result2 = results.get(2);
    const result3 = results.get(3);
    expect(result2 && result2 >= 1).toBe(true);
    expect(result3 && result3 >= 1).toBe(true);
  });

  test('given range of 2 to 4, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(2, 4);
    expect(results.size).toBe(3);

    const result2 = results.get(2);
    const result3 = results.get(3);
    const result4 = results.get(4);
    expect(result2 && result2 >= 1).toBe(true);
    expect(result3 && result3 >= 1).toBe(true);
    expect(result4 && result4 >= 1).toBe(true);
  });

  test('given range of -1 to 1, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(-1, 1);
    expect(results.size).toBe(3);

    const resultNeg1 = results.get(-1);
    const result0 = results.get(0);
    const result1 = results.get(1);
    expect(resultNeg1 && resultNeg1 >= 1).toBe(true);
    expect(result0 && result0 >= 1).toBe(true);
    expect(result1 && result1 >= 1).toBe(true);
  });

  test('given range of -1 to -1, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(-1, -1);
    expect(results.size).toBe(1);

    const resultNeg1 = results.get(-1);
    expect(resultNeg1 && resultNeg1 >= 1).toBe(true);
  });

  test('given range of -2 to -1, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(-2, -1);
    expect(results.size).toBe(2);

    const resultNeg2 = results.get(-2);
    const resultNeg1 = results.get(-1);
    expect(resultNeg2 && resultNeg2 >= 1).toBe(true);
    expect(resultNeg1 && resultNeg1 >= 1).toBe(true);
  });

  test('given range of -3 to -1, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(-3, -1);
    expect(results.size).toBe(3);

    const resultNeg3 = results.get(-3);
    const resultNeg2 = results.get(-2);
    const resultNeg1 = results.get(-1);
    expect(resultNeg3 && resultNeg3 >= 1).toBe(true);
    expect(resultNeg2 && resultNeg2 >= 1).toBe(true);
    expect(resultNeg1 && resultNeg1 >= 1).toBe(true);
  });

  test('given range of -2 to -2, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(-2, -2);
    expect(results.size).toBe(1);

    const resultNeg2 = results.get(-2);
    expect(resultNeg2 && resultNeg2 >= 1).toBe(true);
  });

  test('given range of -3 to -2, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(-3, -2);
    expect(results.size).toBe(2);

    const resultNeg3 = results.get(-3);
    const resultNeg2 = results.get(-2);
    expect(resultNeg3 && resultNeg3 >= 1).toBe(true);
    expect(resultNeg2 && resultNeg2 >= 1).toBe(true);
  });

  test('given range of -4 to -2, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(-4, -2);
    expect(results.size).toBe(3);

    const resultNeg4 = results.get(-4);
    const resultNeg3 = results.get(-3);
    const resultNeg2 = results.get(-2);
    expect(resultNeg4 && resultNeg4 >= 1).toBe(true);
    expect(resultNeg3 && resultNeg3 >= 1).toBe(true);
    expect(resultNeg2 && resultNeg2 >= 1).toBe(true);
  });
});

// describe('when get random point', () => {

//   test('given, then', () => {
//     // TODO: Finish
//     const bounds: Bounds = new Bounds(
//       Vector2.zero(),
//       new Vector2(3, 3),
//     );

//     Rng.getInstance().getRandomPoint(bounds);
//   });
// });

function populateMap(start: number, end: number): Map<number, number> {
  const results: Map<number, number> = new Map<number, number>();

  const rng: Rng = Rng.getInstance();
  for(let i = 0; i < 100; i++) {
    const value = rng.getRandomInt(start, end);

    let current = results.get(value);

    if (current == undefined) current = 0;

    results.set(value, (current + 1));
  }

  return results;
}
