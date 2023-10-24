import Sprite from './sprite';
import Transform from './transform';

export default abstract class Character {

  private name: string;

  private maxHealth: number;
  private health: number;

  private accuracy: number;
  private attackSpeed: number;
  private critChance: number;
  private critDamage: number;

  private attackRange: number;

  private attackTicker: number;
  private abilityTicker: number;

  private transform: Transform;

  private sprite: Sprite;

  private target: Character | null;

  // private autoAttackAbility: Ability;
  // private currentAbility: Ability | null;

  public constructor(
    name: string,
    maxHealth: number,
    health: number,
    accuracy: number,
    attackSpeed: number,
    critChance: number,
    critDamage: number,
    attackRange: number,
    transform: Transform,
    sprite: Sprite,
    // autoAttackAbility: Ability,
  ) {
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
    this.transform = transform;
    this.sprite = sprite;
    this.target = null;
    // this.autoAttackAbility = autoAttackAbility;
    // this.currentAbility = null;
  }
}
