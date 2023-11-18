import Character from './character.js';
import Vector2 from '../../../engine/model/vector2.js';
export default class Player extends Character {
    constructor(animator, inputModule, name, maxHealth, health, accuracy, attackSpeed, critChance, critDamage, attackRange, inventory
    // autoAttackAbility: Ability,
    ) {
        super(animator, name, maxHealth, health, accuracy, attackSpeed, critChance, critDamage, attackRange);
        this.keybindModule = null;
        this.inputModule = inputModule;
        this.inventory = inventory;
        this.velocity = Vector2.zero();
        this.movementSpeed = 8;
    }
    setKeybindModule(keybindModule) {
        this.keybindModule = keybindModule;
        this.keybindModule.setPlayer(this);
    }
    update() {
        var _a;
        // console.log('[Player#update]');
        const horizontal = this.inputModule.getXAxis();
        const vertical = this.inputModule.getYAxis();
        this.velocity = new Vector2(horizontal * this.movementSpeed, (vertical * this.movementSpeed) * -1 // This is only for HTML Canvas
        );
        // console.log(`Transform before: ${this.transform.x}`);
        // this.transform.setPosition(setX(this.transform.getX() + this.velocity.x);
        // this.transform.setY(this.transform.getY() + this.velocity.y);
        // this.transform.position = new Vector2(
        //   this.transform.position.x + this.velocity.x,
        //   this.transform.position.y + this.velocity.y,
        // );
        this.transform.translate(this.velocity);
        // console.log(`Transform after: ${this.transform.x}`);
        (_a = this.keybindModule) === null || _a === void 0 ? void 0 : _a.perform();
        // console.log(this.spriteRenderer);
        this.animator.render();
    }
}
