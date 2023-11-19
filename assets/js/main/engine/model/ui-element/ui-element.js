import GameObject from '../game-object.js';
export default class UiElement extends GameObject {
    constructor(animator) {
        super(animator);
    }
    update() {
        // console.log('[UiElement#update]');
        this.animator.render();
    }
}
