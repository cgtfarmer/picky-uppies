import Resource from './resource.js';
import CircleSprite from '/picky-uppies/assets/js/main/engine/model/sprite/canvas/circle-sprite.js';
import Vector2 from '/picky-uppies/assets/js/main/engine/model/vector2.js';
import Rng from '/picky-uppies/assets/js/main/engine/model/rng.js';
import CircleSpriteCanvasRenderer from '/picky-uppies/assets/js/main/engine/model/sprite-renderer/canvas/circle-sprite-canvas-renderer.js';
import Animator from '/picky-uppies/assets/js/main/engine/model/animator/animator.js';
export default class ResourceFactory {
    // private readonly spriteRendererFactory: SpriteRendererFactory;
    static getInstance() {
        if (this.singleton == null) {
            // const spriteRendererFactory = SpriteRendererFactory.getInstance();
            // this.singleton = new ResourceFactory(spriteRendererFactory);
            this.singleton = new ResourceFactory();
        }
        return this.singleton;
    }
    // public constructor(spriteRendererFactory: SpriteRendererFactory) {
    //   this.spriteRendererFactory = spriteRendererFactory;
    // }
    createRandom(bounds) {
        const rng = Rng.getInstance();
        const roll = rng.getRandomInt(1, 3);
        switch (roll) {
            case 1:
                return this.createPrometium(bounds.getRandomPointWithPadding(30));
            case 2:
                return this.createEndurium(bounds.getRandomPointWithPadding(30));
            case 3:
                return this.createTerbium(bounds.getRandomPointWithPadding(30));
            default:
                throw Error('Invalid roll');
        }
    }
    createPrometium(position) {
        // const display: Display | null = Game.getInstance().getDisplay();
        // if (display == null) throw Error('Display must be present');
        const sprite = new CircleSprite(Vector2.zero(), 30, true, 2, '#ff0000', '#000000');
        const spriteRenderer = new CircleSpriteCanvasRenderer();
        const animator = new Animator(spriteRenderer, [sprite]);
        // const spriteRenderer: SpriteRenderer =
        //   this.spriteRendererFactory.create(sprite, display, transform);
        const resource = new Resource(animator, 'Prometium', 10);
        resource.getTransform().position = position;
        return resource;
    }
    createEndurium(position) {
        // const display: Display | null = Game.getInstance().getDisplay();
        // if (display == null) throw Error('Display must be present');
        // const transform: Transform = new Transform(position);
        // const sprite: Sprite =
        // new CircleSprite(transform.position, 30, true, 2, '#0000ff', '#000000');
        // const spriteRenderer: SpriteRenderer =
        //   this.spriteRendererFactory.create(sprite, display, transform);
        const sprite = new CircleSprite(Vector2.zero(), 30, true, 2, '#0000ff', '#000000');
        const spriteRenderer = new CircleSpriteCanvasRenderer();
        const animator = new Animator(spriteRenderer, [sprite]);
        const resource = new Resource(animator, 'Endurium', 10);
        resource.getTransform().position = position;
        return resource;
    }
    createTerbium(position) {
        // const display: Display | null = Game.getInstance().getDisplay();
        // if (display == null) throw Error('Display must be present');
        // const transform: Transform = new Transform(position);
        // const sprite: Sprite =
        // new CircleSprite(transform.position, 30, true, 2, '#ffff00', '#000000');
        // const spriteRenderer: SpriteRenderer =
        //   this.spriteRendererFactory.create(sprite, display, transform);
        const sprite = new CircleSprite(Vector2.zero(), 30, true, 2, '#ffff00', '#000000');
        const spriteRenderer = new CircleSpriteCanvasRenderer();
        const animator = new Animator(spriteRenderer, [sprite]);
        const resource = new Resource(animator, 'Terbium', 10);
        resource.getTransform().position = position;
        return resource;
    }
}
