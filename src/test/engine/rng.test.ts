import Bounds from '../../main/engine/model/bounds';
import Rng from '../../main/engine/model/rng';
import Vector2 from '../../main/engine/model/vector2';

describe('when get random int', () => {

  test('given end is less than start, then throws error', () => {
    expect(() => Rng.getInstance().getRandomInt(1, 0))
      .toThrow(Error);
  });

  test('given range of 0 to 0, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(0, 0);
    expect(results.size).toBe(1);

    const result0 = results.get(0);
    expect(result0 && result0 >= 1).toBeTruthy();
  });

  test('given range of 0 to 1, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(0, 1);
    expect(results.size).toBe(2);

    const result0 = results.get(0);
    const result1 = results.get(1);
    expect(result0 && result0 >= 1).toBeTruthy();
    expect(result1 && result1 >= 1).toBeTruthy();
  });

  test('given range of 0 to 2, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(0, 2);
    expect(results.size).toBe(3);

    const result0 = results.get(0);
    const result1 = results.get(1);
    const result2 = results.get(2);
    expect(result0 && result0 >= 1).toBeTruthy();
    expect(result1 && result1 >= 1).toBeTruthy();
    expect(result2 && result2 >= 1).toBeTruthy();
  });

  test('given range of 1 to 1, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(1, 1);
    expect(results.size).toBe(1);

    const result1 = results.get(1);
    expect(result1 && result1 >= 1).toBeTruthy();
  });

  test('given range of 1 to 2, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(1, 2);
    expect(results.size).toBe(2);

    const result1 = results.get(1);
    const result2 = results.get(2);
    expect(result1 && result1 >= 1).toBeTruthy();
    expect(result2 && result2 >= 1).toBeTruthy();
  });

  test('given range of 1 to 3, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(1, 3);
    expect(results.size).toBe(3);

    const result1 = results.get(1);
    const result2 = results.get(2);
    const result3 = results.get(3);
    expect(result1 && result1 >= 1).toBeTruthy();
    expect(result2 && result2 >= 1).toBeTruthy();
    expect(result3 && result3 >= 1).toBeTruthy();
  });

  test('given range of 2 to 2, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(2, 2);
    expect(results.size).toBe(1);

    const result2 = results.get(2);
    expect(result2 && result2 >= 1).toBeTruthy();
  });

  test('given range of 2 to 3, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(2, 3);
    expect(results.size).toBe(2);

    const result2 = results.get(2);
    const result3 = results.get(3);
    expect(result2 && result2 >= 1).toBeTruthy();
    expect(result3 && result3 >= 1).toBeTruthy();
  });

  test('given range of 2 to 4, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(2, 4);
    expect(results.size).toBe(3);

    const result2 = results.get(2);
    const result3 = results.get(3);
    const result4 = results.get(4);
    expect(result2 && result2 >= 1).toBeTruthy();
    expect(result3 && result3 >= 1).toBeTruthy();
    expect(result4 && result4 >= 1).toBeTruthy();
  });

  test('given range of -1 to 1, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(-1, 1);
    expect(results.size).toBe(3);

    const resultNeg1 = results.get(-1);
    const result0 = results.get(0);
    const result1 = results.get(1);
    expect(resultNeg1 && resultNeg1 >= 1).toBeTruthy();
    expect(result0 && result0 >= 1).toBeTruthy();
    expect(result1 && result1 >= 1).toBeTruthy();
  });

  test('given range of -1 to -1, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(-1, -1);
    expect(results.size).toBe(1);

    const resultNeg1 = results.get(-1);
    expect(resultNeg1 && resultNeg1 >= 1).toBeTruthy();
  });

  test('given range of -2 to -1, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(-2, -1);
    expect(results.size).toBe(2);

    const resultNeg2 = results.get(-2);
    const resultNeg1 = results.get(-1);
    expect(resultNeg2 && resultNeg2 >= 1).toBeTruthy();
    expect(resultNeg1 && resultNeg1 >= 1).toBeTruthy();
  });

  test('given range of -3 to -1, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(-3, -1);
    expect(results.size).toBe(3);

    const resultNeg3 = results.get(-3);
    const resultNeg2 = results.get(-2);
    const resultNeg1 = results.get(-1);
    expect(resultNeg3 && resultNeg3 >= 1).toBeTruthy();
    expect(resultNeg2 && resultNeg2 >= 1).toBeTruthy();
    expect(resultNeg1 && resultNeg1 >= 1).toBeTruthy();
  });

  test('given range of -2 to -2, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(-2, -2);
    expect(results.size).toBe(1);

    const resultNeg2 = results.get(-2);
    expect(resultNeg2 && resultNeg2 >= 1).toBeTruthy();
  });

  test('given range of -3 to -2, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(-3, -2);
    expect(results.size).toBe(2);

    const resultNeg3 = results.get(-3);
    const resultNeg2 = results.get(-2);
    expect(resultNeg3 && resultNeg3 >= 1).toBeTruthy();
    expect(resultNeg2 && resultNeg2 >= 1).toBeTruthy();
  });

  test('given range of -4 to -2, then populates range inclusively', () => {
    const results: Map<number, number> = populateMap(-4, -2);
    expect(results.size).toBe(3);

    const resultNeg4 = results.get(-4);
    const resultNeg3 = results.get(-3);
    const resultNeg2 = results.get(-2);
    expect(resultNeg4 && resultNeg4 >= 1).toBeTruthy();
    expect(resultNeg3 && resultNeg3 >= 1).toBeTruthy();
    expect(resultNeg2 && resultNeg2 >= 1).toBeTruthy();
  });
});

// TODO: Clean up these next 2 describe blocks
describe('getRandomPoint', () => {

  test('given bounds with (0, 0), (10, 6), then populates range inclusively', () => {
    const rng: Rng = Rng.getInstance();

    const bounds: Bounds = new Bounds(Vector2.zero(), new Vector2(10, 6));

    const xResults: Map<number, number> = new Map<number, number>();
    const yResults: Map<number, number> = new Map<number, number>();
    for(let i = 0; i < 500; i++) {
      const point: Vector2 = rng.getRandomPoint(bounds);

      let currentX = xResults.get(point.x);
      if (currentX == undefined) currentX = 0;

      let currentY = yResults.get(point.y);
      if (currentY == undefined) currentY = 0;

      xResults.set(point.x, (currentX + 1));
      yResults.set(point.y, (currentY + 1));
    }

    console.log(xResults);
    console.log(yResults);

    const xResultNeg5 = xResults.get(-5);
    const xResultNeg3 = xResults.get(-3);
    const xResult0 = xResults.get(0);
    const xResult3 = xResults.get(3);
    const xResult5 = xResults.get(5);
    expect(xResultNeg5 && xResultNeg5 >= 1).toBeTruthy();
    expect(xResultNeg3 && xResultNeg3 >= 1).toBeTruthy();
    expect(xResult0 && xResult0 >= 1).toBeTruthy();
    expect(xResult3 && xResult3 >= 1).toBeTruthy();
    expect(xResult5 && xResult5 >= 1).toBeTruthy();

    const yResultNeg3 = yResults.get(-3);
    const yResultNeg1 = yResults.get(-1);
    const yResult0 = yResults.get(0);
    const yResult1 = yResults.get(1);
    const yResult3 = yResults.get(3);
    expect(yResultNeg3 && yResultNeg3 >= 1).toBeTruthy();
    expect(yResultNeg1 && yResultNeg1 >= 1).toBeTruthy();
    expect(yResult0 && yResult0 >= 1).toBeTruthy();
    expect(yResult1 && yResult1 >= 1).toBeTruthy();
    expect(yResult3 && yResult3 >= 1).toBeTruthy();
  });
});

describe('getRandomPointWithPadding', () => {

  test('given bounds with (0, 0), (10, 6), then populates range inclusively w/ padding', () => {
    const rng: Rng = Rng.getInstance();

    const bounds: Bounds = new Bounds(Vector2.zero(), new Vector2(10, 6));

    const xResults: Map<number, number> = new Map<number, number>();
    const yResults: Map<number, number> = new Map<number, number>();
    for(let i = 0; i < 500; i++) {
      const point: Vector2 = rng.getRandomPointWithPadding(bounds, 1);

      let currentX = xResults.get(point.x);
      if (currentX == undefined) currentX = 0;

      let currentY = yResults.get(point.y);
      if (currentY == undefined) currentY = 0;

      xResults.set(point.x, (currentX + 1));
      yResults.set(point.y, (currentY + 1));
    }

    console.log(xResults);
    console.log(yResults);

    const xResultNeg5 = xResults.get(-5);
    const xResultNeg3 = xResults.get(-3);
    const xResult0 = xResults.get(0);
    const xResult3 = xResults.get(3);
    const xResult5 = xResults.get(5);
    expect(xResultNeg5).toBe(undefined);
    expect(xResultNeg3 && xResultNeg3 >= 1).toBeTruthy();
    expect(xResult0 && xResult0 >= 1).toBeTruthy();
    expect(xResult3 && xResult3 >= 1).toBeTruthy();
    expect(xResult5).toBe(undefined);

    const yResultNeg3 = yResults.get(-3);
    const yResultNeg1 = yResults.get(-1);
    const yResult0 = yResults.get(0);
    const yResult1 = yResults.get(1);
    const yResult3 = yResults.get(3);
    expect(yResultNeg3).toBe(undefined);
    expect(yResultNeg1 && yResultNeg1 >= 1).toBeTruthy();
    expect(yResult0 && yResult0 >= 1).toBeTruthy();
    expect(yResult1 && yResult1 >= 1).toBeTruthy();
    expect(yResult3).toBe(undefined);
  });
});

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
