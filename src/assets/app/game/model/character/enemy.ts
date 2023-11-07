import Character from './character.js';
import { Demeanor } from '../../enum/demeanor.js';
import Sprite from '../../../engine/model/sprite/sprite.js';
import Transform from '../../../engine/model/transform.js';

export default class Enemy extends Character {
  private aggroRange: number;
  private disengageRange: number;
  private experience: number;
  private demeanor: Demeanor;

  private lootTable: LootTable;

  public constructor(
    transform: Transform,
    sprite: Sprite,
    name: string,
    maxHealth: number,
    health: number,
    accuracy: number,
    attackSpeed: number,
    critChance: number,
    critDamage: number,
    attackRange: number,
    aggroRange: number,
    disengageRange: number,
    experience: number,
    demeanor: number,
    lootTable: LootTable
  ) {
    super(
      transform,
      sprite,
      name,
      maxHealth,
      health,
      accuracy,
      attackSpeed,
      critChance,
      critDamage,
      attackRange
    );

    this.aggroRange = aggroRange;
    this.disengageRange = disengageRange;
    this.experience = experience;
    this.demeanor = demeanor;
    this.lootTable = lootTable;
  }

  public override update(): void {
    this.spriteRenderer?.render();
  }
}
