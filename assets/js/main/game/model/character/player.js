import Character from './character.js';
import Vector2 from '../../../engine/model/vector2.js';
export default class Player extends Character {
    constructor(animator, inputModule, name, maxHealth, health, accuracy, attackSpeed, critChance, critDamage, attackRange, inventory) {
        super(animator, name, maxHealth, health, accuracy, attackSpeed, critChance, critDamage, attackRange);
        this.keybindModule = null;
        this.inputModule = inputModule;
        this.inventory = inventory;
        this.movementSpeed = 8;
    }
    setKeybindModule(keybindModule) {
        this.keybindModule = keybindModule;
        this.keybindModule.setPlayer(this);
    }
    update() {
        // console.log('[Player#update]');
        var _a, _b;
        const movement = new Vector2(this.inputModule.getXAxis(), this.inputModule.getYAxis());
        const velocity = movement.normalize().multiplyScalar(this.movementSpeed);
        (_a = this.rigidBody) === null || _a === void 0 ? void 0 : _a.translate(velocity);
        (_b = this.keybindModule) === null || _b === void 0 ? void 0 : _b.perform();
        this.animator.render();
    }
}
