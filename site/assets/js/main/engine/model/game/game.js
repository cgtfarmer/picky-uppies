import GameFactory from './game-factory.js';
class Game {
    static getInstance() {
        if (this.singleton == null) {
            this.singleton = GameFactory.getInstance().createDefault();
        }
        return this.singleton;
    }
    constructor(eventSystem, scenes) {
        this.display = null;
        this.player = null;
        this.running = false;
        this.interval = null;
        this.eventSystem = eventSystem;
        this.scenes = scenes;
        if (this.scenes.length < 1)
            throw new Error('At least 1 Scene required');
        this.activeScene = scenes[0];
    }
    getActiveScene() {
        return this.activeScene;
    }
    getDisplay() {
        return this.display;
    }
    setDisplay(display) {
        this.display = display;
        this.scenes.forEach((scene) => scene.setDisplay(display));
    }
    setPlayer(player) {
        this.player = player;
        this.getActiveScene().addRenderable(this.player);
    }
    update() {
        if (this.display == null)
            throw Error('Display must be present');
        // console.log('[Game#update]');
        this.display.clearFrame();
        this.activeScene.update();
    }
    start() {
        console.log(`[Game#start] running: ${this.running}`);
        if (this.running)
            return;
        if (this.display == null)
            throw Error('Display must be presetn');
        this.interval = window.setInterval(() => {
            // console.log('[Game#tick]');
            // const container: Element | null = document.querySelector('#container');
            // if (container == null) return;
            // const canvas = CanvasDisplay.getInstance();
            // Game.getInstance(canvas).update();
            Game.getInstance().update();
        }, Game.TICK_IN_MILLISECONDS);
        this.running = true;
    }
}
Game.TICK_IN_MILLISECONDS = 50; // 100;
export default Game;
