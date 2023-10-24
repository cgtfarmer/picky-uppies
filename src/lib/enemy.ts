import Character from './character';
import { Demeanor } from './demeanor';
import Sprite from './sprite';

export default class Enemy extends Character {
  private aggroRange: number;
  private disengageRange: number;
  private experience: number;
  private demeanor: Demeanor;

  private lootTable: LootTable;

  public constructor(
    name: string,
    maxHealth: number,
    health: number,
    accuracy: number,
    attackSpeed: number,
    critChance: number,
    critDamage: number,
    attackRange: number,
    sprite: Sprite,
    aggroRange: number,
    disengageRange: number,
    experience: number,
    demeanor: number,
    lootTable: LootTable
  ) {
    super(
      name,
      maxHealth,
      health,
      accuracy,
      attackSpeed,
      critChance,
      critDamage,
      attackRange,
      sprite
    );

    this.aggroRange = aggroRange;
    this.disengageRange = disengageRange;
    this.experience = experience;
    this.demeanor = demeanor;
    this.lootTable = lootTable;
  }
}
