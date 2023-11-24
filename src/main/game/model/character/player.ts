import { Renderable } from '../../../engine/interface/renderable';
import Character from './character';
import Inventory from '../inventory';
import Vector2 from '../../../engine/model/vector2';
import Animator from '@/main/engine/model/animator/animator';
import { Action } from '@/main/engine/model/action/action';

export default class Player extends Character implements Renderable {

  private inventory: Inventory;

  private movementSpeed: number;

  private movement: Vector2;

  private validActions: Action[];

  private queuedAction: Action | null;

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
    inventory: Inventory
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
      attackRange,
    );

    this.inventory = inventory;
    this.movementSpeed = 8;
    this.movement = Vector2.zero();
    this.validActions = [];
    this.queuedAction = null;
  }

  public setMovement(movement: Vector2): void {
    this.movement = movement;
  }

  public queueAction(action: Action): void {
    console.log(`[Player#queueAction] ${action}`);

    if (!this.validActions.includes(action)) {
      console.log('[Player#queueAction] ERROR: Player cannot perform this action');
      return;
    }

    if (this.queuedAction == action) {
      console.log('[Player#queueAction] ERROR: Player is already performing this action');
      return;
    }

    this.queuedAction = action;
  }

  public override update(): void {
    const velocity: Vector2 = this.movement.normalize()
      .multiplyScalar(this.movementSpeed);

    this.rigidBody?.translate(velocity);

    this.animator?.render();
  }
}
