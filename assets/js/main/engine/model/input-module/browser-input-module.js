export default class BrowserInputModule {
    constructor() {
        this.xAxis = 0;
        this.yAxis = 0;
        this.keys = new Map();
        // window.addEventListener('keypress', this.handleKeypress);
        window.addEventListener('keydown', (event) => {
            event.preventDefault();
            this.registerKey(event.key);
        });
        window.addEventListener('keyup', (event) => {
            event.preventDefault();
            this.unregisterKey(event.key);
        });
    }
    registerKey(key) {
        // console.log(`[InputModule#registerKey] key=${key}`);
        this.keys.set(key, true);
    }
    unregisterKey(key) {
        // console.log(`[InputModule#unregisterKey] key=${key}`);
        this.keys.delete(key);
    }
    getXAxis() {
        let value = 0;
        if (this.keys.has('a') || this.keys.has('ArrowLeft')) {
            value = -1;
        }
        if (this.keys.has('d') || this.keys.has('ArrowRight')) {
            value += 1;
        }
        // if (InputModule.keys.has('a')) value = -1;
        // if (InputModule.keys.has('d')) value += 1;
        return value;
    }
    getYAxis() {
        let value = 0;
        if (this.keys.has('s') || this.keys.has('ArrowDown')) {
            value = -1;
        }
        if (this.keys.has('w') || this.keys.has('ArrowUp')) {
            value += 1;
        }
        // if (InputModule.keys.has('s')) value = -1;
        // if (InputModule.keys.has('w')) value += 1;
        return value;
    }
    keyIsDown(key) {
        return this.keys.has(key);
    }
    getActiveKeys() {
        return Array.from(this.keys.keys());
    }
}
