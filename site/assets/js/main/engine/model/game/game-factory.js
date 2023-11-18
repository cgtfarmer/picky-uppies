import Game from './game.js';
import PlayerFactory from '../../../game/model/character/player-factory.js';
import SceneFactory from '../scene/scene-factory.js';
import EventSystem from '../../event-system/event-system.js';
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
        const game = new Game(eventSystem, scenes);
        player.setScene(game.getActiveScene());
        game.setPlayer(player);
        return game;
    }
}
