import Game from './game.js';
import PlayerFactory from '../../../game/model/character/player-factory.js';
import SceneFactory from '../scene/scene-factory.js';
import EventSystem from '../../event-system/event-system.js';
import SceneManager from '../scene/scene-manager.js';
export default class GameFactory {
    static getInstance() {
        if (this.singleton == null)
            this.singleton = new GameFactory();
        return this.singleton;
    }
    createDefault() {
        const player = PlayerFactory.getInstance().createDefault();
        const scenes = SceneFactory.getInstance().createScenes();
        const eventSystem = EventSystem.getInstance();
        const sceneManager = new SceneManager(scenes);
        const game = new Game(eventSystem, sceneManager);
        player.setScene(game.getActiveScene());
        game.setPlayer(player);
        return game;
    }
}
