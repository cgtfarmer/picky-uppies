import Animator from '@/main/engine/model/animator/animator';
import { Renderable } from '../../../engine/interface/renderable';
import Sprite from '../../../engine/model/sprite/sprite';
import Transform from '../../../engine/model/transform';
import GameObject from '@/main/engine/model/game-object';

export default abstract class Character extends GameObject implements Renderable {

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

  private target: Character | null;

  // private autoAttackAbility: Ability;
  // private currentAbility: Ability | null;

  public constructor(
    animator: Animator,
    name: string,
    maxHealth: number,
    health: number,
    accuracy: number,
    attackSpeed: number,
    critChance: number,
    critDamage: number,
    attackRange: number
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

  public override update(): void {
    throw Error('Override this method');
    // this.spriteRenderer.render();
  }
}
