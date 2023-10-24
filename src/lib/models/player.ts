import { Renderable } from '../interfaces/renderable';
import Character from './character';
import Inventory from './inventory';
import Sprite from './sprite';
import Transform from './transform';

export default class Player extends Character implements Renderable {

  private inventory: Inventory;

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
    inventory: Inventory
    // autoAttackAbility: Ability,
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
      sprite
    );

    this.inventory = inventory;
  }

  public render(): void {
  }
}
