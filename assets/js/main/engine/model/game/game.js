import GameFactory from './game-factory.js';
class Game {
    static getInstance() {
        if (this.singleton == null) {
            this.singleton = GameFactory.getInstance().createDefault();
        }
        return this.singleton;
    }
    constructor(eventSystem, sceneManager) {
        this.display = null;
        this.player = null;
        this.running = false;
        this.interval = null;
        this.eventSystem = eventSystem;
        this.sceneManager = sceneManager;
    }
    getActiveScene() {
        return this.sceneManager.getActiveScene();
    }
    getDisplay() {
        return this.display;
    }
    getDisplayTransformMatrix() {
        if (this.display == null)
            return null;
        return this.display.getTransformMatrix();
    }
    setDisplay(display) {
        this.display = display;
        this.sceneManager.setDisplay(display);
    }
    setPlayer(player) {
        this.player = player;
        this.getActiveScene().addRenderable(this.player);
    }
    update() {
        // console.log('[Game#update]');
        if (this.display == null)
            throw Error('Display must be present');
        this.display.clearFrame();
        this.sceneManager.update();
    }
    start() {
        console.log(`[Game#start] running: ${this.running}`);
        if (this.running)
            return;
        if (this.display == null)
            throw Error('Display must be present');
        this.interval = window.setInterval(() => {
            // console.log('[Game#tick]');
            // const container: Element | null = document.querySelector('#container');
            // if (container == null) return;
            // const canvas = CanvasDisplay.getInstance();
            // Game.getInstance(canvas).update();
            Game.getInstance().update();
        }, Game.TICK_IN_MILLISECONDS);
        this.running = true;
        const stopWatchIndex = this.sceneManager.getActiveScene()
            .findGameObjectIndexByCustomId('stop-watch');
        if (stopWatchIndex == null)
            return;
        const stopWatch = this.sceneManager.getActiveScene()
            .getUiElements()[stopWatchIndex];
        stopWatch.start();
    }
}
Game.TICK_IN_MILLISECONDS = 50; // 100;
export default Game;
