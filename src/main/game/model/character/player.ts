import { Renderable } from '../../../engine/interface/renderable';
import Character from './character';
import Inventory from '../inventory';
import Sprite from '../../../engine/model/sprite/sprite';
import Transform from '../../../engine/model/transform';
import Vector2 from '../../../engine/model/vector2';
import { InputModule } from '@/main/engine/model/input-module/input-module';
import KeybindModule from '@/main/engine/model/keybind-module/keybind-module';
import Animator from '@/main/engine/model/animator/animator';
import Game from '@/main/engine/model/game/game';
import RigidBody2d from '@/main/engine/model/rigid-body/rigid-body-2d';

export default class Player extends Character implements Renderable {

  private inputModule: InputModule;

  private keybindModule: KeybindModule | null;

  private inventory: Inventory;

  private movementSpeed: number;

  public constructor(
    animator: Animator,
    inputModule: InputModule,
    name: string,
    maxHealth: number,
    health: number,
    accuracy: number,
    attackSpeed: number,
    critChance: number,
    critDamage: number,
    attackRange: number,
    inventory: Inventory
    // autoAttackAbility: Ability,
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

    this.keybindModule = null;
    this.inputModule = inputModule;
    this.inventory = inventory;
    this.movementSpeed = 8;
  }

  public setKeybindModule(keybindModule: KeybindModule) {
    this.keybindModule = keybindModule;

    this.keybindModule.setPlayer(this);
  }

  public override update(): void {
    // console.log('[Player#update]');

    const movement: Vector2 = new Vector2(
      this.inputModule.getXAxis(),
      this.inputModule.getYAxis()
    );

    // rb.MovePosition(rb.position + (movement.normalized * moveSpeed * Time.fixedDeltaTime));

    const velocity: Vector2 = movement.normalize().multiply(this.movementSpeed);

    this.rigidBody?.translate(velocity);

    // this.rigidBody.movePosition(this.rigidBody.getPosition() + velocity);

    // this.velocity = movement.normalize()
    //   .multiply(this.movementSpeed)
    //   .scale(displayTransformMatrix);

    // this.transform.translate(this.velocity);

    this.keybindModule?.perform();

    this.animator.render();
  }
}
