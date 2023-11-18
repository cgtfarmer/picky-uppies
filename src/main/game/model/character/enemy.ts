import Character from './character';
import { Demeanor } from '../../enum/demeanor';
import Animator from '@/main/engine/model/animator/animator';
import LootTable from '@/main/engine/model/loot-table';

export default class Enemy extends Character {
  private aggroRange: number;
  private disengageRange: number;
  private experience: number;
  private demeanor: Demeanor;

  private lootTable: LootTable;

  public constructor(
    animator: Animator,
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
      animator,
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
    this.animator.render();
  }
}
