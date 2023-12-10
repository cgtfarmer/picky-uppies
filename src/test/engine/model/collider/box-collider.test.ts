import BoxCollider2d from '@/main/engine/model/collider/box-collider-2d';
import GameObject from '@/main/engine/model/game-object';
import Transform from '@/main/engine/model/transform';
import Vector2 from '@/main/engine/model/vector2';

describe('constructor', () => {

  test('constructs successfully', () => {
    const collider: BoxCollider2d = new BoxCollider2d(
      new GameObject(null, []),
      new Transform(Vector2.zero()),
      new Vector2(6, 4)
    );
  });
});

describe('closestPoint', () => {

  describe('given point is at center of collider', () => {

    test('and center is (0, 0), then defaults to top of collider', () => {
      const center: Vector2 = Vector2.zero();

      const collider: BoxCollider2d = new BoxCollider2d(
        new GameObject(null, []),
        new Transform(center),
        new Vector2(6, 4)
      );

      expect(collider.closestPoint(center))
        .toStrictEqual(new Vector2(0, 2));
    });

    test('and center is (1, 1), then defaults to top of collider', () => {
      const center: Vector2 = new Vector2(1, 1);

      const collider: BoxCollider2d = new BoxCollider2d(
        new GameObject(null, []),
        new Transform(center),
        new Vector2(6, 4)
      );

      expect(collider.closestPoint(center))
        .toStrictEqual(new Vector2(1, 3));
    });

    test('and center is (-1, -1), then defaults to top of collider', () => {
      const center: Vector2 = new Vector2(-1, -1);

      const collider: BoxCollider2d = new BoxCollider2d(
        new GameObject(null, []),
        new Transform(center),
        new Vector2(6, 4)
      );

      expect(collider.closestPoint(center))
        .toStrictEqual(new Vector2(-1, 1));
    });
  });

  describe('given point is on perimeter of collider', () => {

    describe('and center is (0, 0)', () => {

      const collider: BoxCollider2d = new BoxCollider2d(
        new GameObject(null, []),
        new Transform(Vector2.zero()),
        new Vector2(6, 4)
      );

      test('and point is (3, 0), then produces correct answer', () => {
        expect(collider.closestPoint(new Vector2(3, 0)))
          .toStrictEqual(new Vector2(3, 0));
      });

      test('and point is (0, 2), then produces correct answer', () => {
        expect(collider.closestPoint(new Vector2(0, 2)))
          .toStrictEqual(new Vector2(0, 2));
      });

      test('and point is (3, 2), then produces correct answer', () => {
        expect(collider.closestPoint(new Vector2(3, 2)))
          .toStrictEqual(new Vector2(3, 2));
      });

      test('and point is (-3, 0), then produces correct answer', () => {
        expect(collider.closestPoint(new Vector2(-3, 0)))
          .toStrictEqual(new Vector2(-3, 0));
      });

      test('and point is (0, -2), then produces correct answer', () => {
        expect(collider.closestPoint(new Vector2(0, -2)))
          .toStrictEqual(new Vector2(0, -2));
      });

      test('and point is (-3, -2), then produces correct answer', () => {
        expect(collider.closestPoint(new Vector2(-3, -2)))
          .toStrictEqual(new Vector2(-3, -2));
      });
    });

    test('and center is (1, 1), then defaults to top of collider', () => {
      const center: Vector2 = new Vector2(1, 1);

      const collider: BoxCollider2d = new BoxCollider2d(
        new GameObject(null, []),
        new Transform(center),
        new Vector2(6, 4)
      );

      expect(collider.closestPoint(center))
        .toStrictEqual(new Vector2(1, 3));
    });

    test('and center is (-1, -1), then defaults to top of collider', () => {
      const center: Vector2 = new Vector2(-1, -1);

      const collider: BoxCollider2d = new BoxCollider2d(
        new GameObject(null, []),
        new Transform(center),
        new Vector2(6, 4)
      );

      expect(collider.closestPoint(center))
        .toStrictEqual(new Vector2(-1, 1));
    });
  });

  describe('given point is outside of collider', () => {

    describe('and center is (0, 0)', () => {

      const collider: BoxCollider2d = new BoxCollider2d(
        new GameObject(null, []),
        new Transform(Vector2.zero()),
        new Vector2(6, 4)
      );

      test('and point is (6, 0), then produces correct answer', () => {
        expect(collider.closestPoint(new Vector2(6, 0)))
          .toStrictEqual(new Vector2(3, 0));
      });

      test('and point is (-6, 0), then produces correct answer', () => {
        expect(collider.closestPoint(new Vector2(-6, 0)))
          .toStrictEqual(new Vector2(-3, 0));
      });

      test('and point is (0, 4), then produces correct answer', () => {
        expect(collider.closestPoint(new Vector2(0, 4)))
          .toStrictEqual(new Vector2(0, 2));
      });

      test('and point is (0, -4), then produces correct answer', () => {
        expect(collider.closestPoint(new Vector2(0, -4)))
          .toStrictEqual(new Vector2(0, -2));
      });

      test('and point is (6, 4), then produces correct answer', () => {
        expect(collider.closestPoint(new Vector2(6, 4)))
          .toStrictEqual(new Vector2(3, 2));
      });

      test('and point is (-6, -4), then produces correct answer', () => {
        expect(collider.closestPoint(new Vector2(-6, -4)))
          .toStrictEqual(new Vector2(-3, -2));
      });
    });

    describe('and center is (1, 1)', () => {
    });

    describe('and center is (-1, -1)', () => {
    });
  });

  describe('given point is inside of collider', () => {
    describe('and center is (0, 0)', () => {
    });

    describe('and center is (1, 1)', () => {
    });

    describe('and center is (-1, -1)', () => {
    });
  });
});
