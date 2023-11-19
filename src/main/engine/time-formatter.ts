export default class TimeFormatter {

  public static formatMilliseconds(milliseconds: number): string {
    if (milliseconds < 0) throw new Error('Milliseconds must not be negative');

    if (milliseconds == 0) return '00:00:00';

    const centiSeconds: number = Math.floor(milliseconds / 10);

    const seconds: number = Math.floor(centiSeconds / 100);

    const minutes: number = Math.floor(seconds / 60);

    return `${TimeFormatter.formatNumber(minutes % 60)}:` +
      `${TimeFormatter.formatNumber(seconds % 60)}:` +
      `${TimeFormatter.formatNumber(centiSeconds % 100)}`;
  }

  private static formatNumber(value: number) {
    if (value >= 10) return value;

    return `0${value}`;
  }
}
