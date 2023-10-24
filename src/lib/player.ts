import Character from './character';
import Rectangle from './rectangle';
import Sprite from './sprite';

export default class Player extends Character {

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
      sprite
    );
  }
}
