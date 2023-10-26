import { SpriteRenderer } from '@/lib/engine/model/sprite-renderer/sprite-renderer';
import { Renderable } from '../../engine/interface/renderable';
import Sprite from '../../engine/model/sprite/sprite';
import Transform from '../../engine/model/transform';

export default abstract class Character implements Renderable {

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

  protected transform: Transform;

  private sprite: Sprite;

  protected spriteRenderer: SpriteRenderer;

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
    spriteRenderer: SpriteRenderer
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
    this.spriteRenderer = spriteRenderer;
    this.target = null;
    // this.autoAttackAbility = autoAttackAbility;
    // this.currentAbility = null;
  }

  public update(): void {
    throw Error('Override this method');
    // this.spriteRenderer.render();
  }
}
