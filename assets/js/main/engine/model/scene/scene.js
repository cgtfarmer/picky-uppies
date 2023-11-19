export default class Scene {
    constructor(bounds, players, resources, uiElements) {
        this.bounds = bounds;
        this.players = players;
        this.resources = resources;
        this.uiElements = uiElements;
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
    getUiElements() {
        return this.uiElements;
    }
    addGameObject(gameObject) {
        // TODO: Finish
        this.uiElements.push(gameObject);
    }
    removeGameObjectByCustomId(customId) {
        // TODO: Finish
        const index = this.findGameObjectIndexByCustomId(customId);
        if (index == null)
            return;
        this.uiElements.splice(index, 1);
    }
    removeGameObjectByIndex(index) {
        // TODO: Finish
        this.uiElements.splice(index, 1);
    }
    findGameObjectIndexByCustomId(customId) {
        // TODO: Finish
        for (let i = 0; i < this.uiElements.length; i++) {
            var uiElement = this.uiElements[i];
            if (uiElement.customId != customId)
                continue;
            return i;
        }
        return null;
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
        this.uiElements.forEach((gameObject) => {
            gameObject.setDisplay(display);
        });
    }
    update() {
        // console.log(this.resources);
        this.resources.forEach(e => e.update());
        this.players.forEach(e => e.update());
        this.uiElements.forEach(e => e.update());
        // this.resourceSpawnEngine?.update();
    }
}
