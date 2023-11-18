import Character from './character.js';
export default class Enemy extends Character {
    constructor(animator, name, maxHealth, health, accuracy, attackSpeed, critChance, critDamage, attackRange, aggroRange, disengageRange, experience, demeanor, lootTable) {
        super(animator, name, maxHealth, health, accuracy, attackSpeed, critChance, critDamage, attackRange);
        this.aggroRange = aggroRange;
        this.disengageRange = disengageRange;
        this.experience = experience;
        this.demeanor = demeanor;
        this.lootTable = lootTable;
    }
    update() {
        this.animator.render();
    }
}
