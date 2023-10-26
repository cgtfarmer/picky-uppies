import Character from './character';
import { Demeanor } from '../enum/demeanor';
import Sprite from '../../engine/model/sprite/sprite';
import Transform from '../../engine/model/transform';
import RectangleSpriteCanvasRenderer from '../../engine/model/sprite-renderer/canvas/rectangle-sprite-canvas-renderer';

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
    transform: Transform,
    sprite: Sprite,
    spriteRenderer: RectangleSpriteCanvasRenderer,
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
      transform,
      sprite,
      spriteRenderer
    );

    this.aggroRange = aggroRange;
    this.disengageRange = disengageRange;
    this.experience = experience;
    this.demeanor = demeanor;
    this.lootTable = lootTable;
  }

  public update(): void {
    this.spriteRenderer.render();
  }
}
