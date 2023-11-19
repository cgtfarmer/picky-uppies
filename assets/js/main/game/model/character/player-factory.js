import BrowserInputModule from '../../../engine/model/input-module/browser-input-module.js';
import Inventory from '../inventory.js';
import Player from './player.js';
import RectangleSprite from '../../../engine/model/sprite/canvas/rectangle-sprite.js';
import Vector2 from '/picky-uppies/assets/js/main/engine/model/vector2.js';
import KeybindModule from '/picky-uppies/assets/js/main/engine/model/keybind-module/keybind-module.js';
import Interact from '/picky-uppies/assets/js/main/engine/model/action/interact.js';
import Bounds from '/picky-uppies/assets/js/main/engine/model/bounds.js';
import Animator from '/picky-uppies/assets/js/main/engine/model/animator/animator.js';
import RectangleSpriteCanvasRenderer from '/picky-uppies/assets/js/main/engine/model/sprite-renderer/canvas/rectangle-sprite-canvas-renderer.js';
import RigidBody2d from '/picky-uppies/assets/js/main/engine/model/rigid-body/rigid-body-2d.js';
export default class PlayerFactory {
    // private readonly spriteRendererFactory: SpriteRendererFactory;
    static getInstance() {
        if (this.singleton == null) {
            // const spriteRendererFactory = SpriteRendererFactory.getInstance();
            // this.singleton = new PlayerFactory(spriteRendererFactory);
            this.singleton = new PlayerFactory();
        }
        return this.singleton;
    }
    // public constructor(spriteRendererFactory: SpriteRendererFactory) {
    //   this.spriteRendererFactory = spriteRendererFactory;
    // }
    createDefault() {
        // const game: Game = Game.getInstance();
        // const display: Display | null = game.getDisplay();
        // if (display == null) throw Error('Display must be present');
        const rigidBody = new RigidBody2d();
        // const sprite: RectangleSprite = new RectangleSprite(40, 40, true, 2, '#ff0000', '#000000');
        const bounds = new Bounds(Vector2.zero(), new Vector2(40, 40));
        const sprite = new RectangleSprite(bounds, true, 2, '#ffffff', '#000000');
        const spriteRenderer = new RectangleSpriteCanvasRenderer();
        const animator = new Animator(spriteRenderer, [sprite]);
        const inventory = new Inventory();
        // const spriteRenderer: SpriteRenderer =
        //   this.spriteRendererFactory.create(sprite, display, transform);
        // new RectangleSpriteCanvasRenderer(sprite, transform, this.canvas);
        const inputModule = new BrowserInputModule();
        const keybindings = new Map([
            [' ', new Interact(0, 55)],
        ]);
        const keybindModule = new KeybindModule(inputModule, keybindings);
        const player = new Player(animator, inputModule, 'Player', 100, 100, 0.5, 1.0, 0.05, 0.5, 100, inventory);
        player.setRigidBody(rigidBody);
        player.setKeybindModule(keybindModule);
        return player;
    }
}
