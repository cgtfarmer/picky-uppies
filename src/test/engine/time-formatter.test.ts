import TimeFormatter from '@/main/engine/time-formatter';

describe('when format milliseconds', () => {

  test('given value is negative, then throws error', () => {
    expect(() => TimeFormatter.formatMilliseconds(-1))
      .toThrow(Error);
  });

  test('given 0 milliseconds, then produces the correct output', () => {
    expect(TimeFormatter.formatMilliseconds(0))
      .toBe('00:00:00');
  });

  test('given 500 milliseconds, then produces the correct output', () => {
    expect(TimeFormatter.formatMilliseconds(500))
      .toBe('00:00:50');
  });

  test('given 999 milliseconds, then produces the correct output', () => {
    expect(TimeFormatter.formatMilliseconds(999))
      .toBe('00:00:99');
  });

  test('given 1000 milliseconds, then produces the correct output', () => {
    expect(TimeFormatter.formatMilliseconds(1000))
      .toBe('00:01:00');
  });

  test('given 1500 milliseconds, then produces the correct output', () => {
    expect(TimeFormatter.formatMilliseconds(1500))
      .toBe('00:01:50');
  });

  test('given 2000 milliseconds, then produces the correct output', () => {
    expect(TimeFormatter.formatMilliseconds(2000))
      .toBe('00:02:00');
  });

  test('given 59000 milliseconds, then produces the correct output', () => {
    expect(TimeFormatter.formatMilliseconds(59000))
      .toBe('00:59:00');
  });

  test('given 60000 milliseconds, then produces the correct output', () => {
    expect(TimeFormatter.formatMilliseconds(60000))
      .toBe('01:00:00');
  });

  test('given 60000 milliseconds, then produces the correct output', () => {
    expect(TimeFormatter.formatMilliseconds(60000))
      .toBe('01:00:00');
  });
});
