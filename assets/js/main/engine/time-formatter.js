export default class TimeFormatter {
    static formatMilliseconds(milliseconds) {
        if (milliseconds < 0)
            throw new Error('Milliseconds must not be negative');
        if (milliseconds == 0)
            return '00:00:00';
        const centiSeconds = Math.floor(milliseconds / 10);
        const seconds = Math.floor(centiSeconds / 100);
        const minutes = Math.floor(seconds / 60);
        return `${TimeFormatter.formatNumber(minutes % 60)}:` +
            `${TimeFormatter.formatNumber(seconds % 60)}:` +
            `${TimeFormatter.formatNumber(centiSeconds % 100)}`;
    }
    static formatNumber(value) {
        if (value >= 10)
            return value;
        return `0${value}`;
    }
}
