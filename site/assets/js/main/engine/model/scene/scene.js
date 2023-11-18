export default class Scene {
    constructor(bounds, players, resources) {
        this.bounds = bounds;
        this.players = players;
        this.resources = resources;
        // this.resourceSpawnEngine = null;
    }
    // public setResourceSpawnEngine(resourceSpawnEngine: ResourceSpawnEngine): void {
    //   this.resourceSpawnEngine = resourceSpawnEngine;
    //   this.resourceSpawnEngine.setScene(this);
    // }
    getBounds() {
        return this.bounds;
    }
    getPlayers() {
        return this.players;
    }
    getResources() {
        return this.resources;
    }
    setResources(resources) {
        this.resources = resources;
    }
    addRenderable(renderable) {
        this.players.push(renderable);
    }
    setDisplay(display) {
        // const spriteRendererFactory: SpriteRendererFactory = SpriteRendererFactory.getInstance();
        this.players.forEach((gameObject) => {
            // const sprite: Sprite | null = gameObject.getSprite();
            // if (sprite == null) return;
            // const spriteRenderer: SpriteRenderer =
            //   // spriteRendererFactory.create(sprite, display, gameObject.getTransform());
            //   spriteRendererFactory.create(sprite, display, this);
            gameObject.setDisplay(display);
            // gameObject.setSpriteRenderer(spriteRenderer);
        });
        this.resources.forEach((gameObject) => {
            // const sprite: Sprite | null = gameObject.getSprite();
            // if (sprite == null) return;
            // const spriteRenderer: SpriteRenderer =
            //   spriteRendererFactory.create(sprite, display, this);
            // const spriteRenderer: SpriteRenderer =
            gameObject.setDisplay(display);
        });
    }
    update() {
        this.resources.forEach(e => e.update());
        this.players.forEach(e => e.update());
        // this.resourceSpawnEngine?.update();
    }
}
