import GameObject from '/assets/js/main/engine/model/game-object.js';
export default class Character extends GameObject {
    // private autoAttackAbility: Ability;
    // private currentAbility: Ability | null;
    constructor(animator, name, maxHealth, health, accuracy, attackSpeed, critChance, critDamage, attackRange
    // autoAttackAbility: Ability,
    ) {
        super(animator);
        this.name = name;
        this.maxHealth = maxHealth;
        this.health = health;
        this.accuracy = accuracy;
        this.attackSpeed = attackSpeed;
        this.critChance = critChance;
        this.critDamage = critDamage;
        this.attackRange = attackRange;
        this.attackTicker = 0;
        this.abilityTicker = 0;
        this.target = null;
        // this.autoAttackAbility = autoAttackAbility;
        // this.currentAbility = null;
    }
    update() {
        throw Error('Override this method');
        // this.spriteRenderer.render();
    }
}
