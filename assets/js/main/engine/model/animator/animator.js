export default class Animator {
    constructor(spriteRenderer, sprites) {
        this.sprites = sprites;
        this.activeSprite = sprites[0];
        this.spriteRenderer = spriteRenderer;
        this.spriteRenderer.setSprite(this.activeSprite);
        this.gameObject = null;
    }
    getActiveSprite() {
        return this.activeSprite;
    }
    setDisplay(display) {
        this.spriteRenderer.setDisplay(display);
    }
    setGameObject(gameObject) {
        this.gameObject = gameObject;
        this.spriteRenderer.setGameObject(this.gameObject);
    }
    render() {
        this.spriteRenderer.render();
    }
}
