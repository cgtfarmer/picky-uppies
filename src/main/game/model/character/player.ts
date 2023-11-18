import { Renderable } from '../../../engine/interface/renderable';
import Character from './character';
import Inventory from '../inventory';
import Sprite from '../../../engine/model/sprite/sprite';
import Transform from '../../../engine/model/transform';
import Vector2 from '../../../engine/model/vector2';
import { InputModule } from '@/main/engine/model/input-module/input-module';
import KeybindModule from '@/main/engine/model/keybind-module/keybind-module';
import Animator from '@/main/engine/model/animator/animator';

export default class Player extends Character implements Renderable {

  private inputModule: InputModule;

  private keybindModule: KeybindModule | null;

  private inventory: Inventory;

  private velocity: Vector2;

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
    this.velocity = Vector2.zero();
    this.movementSpeed = 8;
  }

  public setKeybindModule(keybindModule: KeybindModule) {
    this.keybindModule = keybindModule;

    this.keybindModule.setPlayer(this);
  }

  public override update(): void {
    // console.log('[Player#update]');
    const horizontal: number = this.inputModule.getXAxis();
    const vertical: number = this.inputModule.getYAxis();

    this.velocity = new Vector2(
      horizontal * this.movementSpeed,
      (vertical * this.movementSpeed) * -1 // This is only for HTML Canvas
    );

    // console.log(`Transform before: ${this.transform.x}`);
    // this.transform.setPosition(setX(this.transform.getX() + this.velocity.x);
    // this.transform.setY(this.transform.getY() + this.velocity.y);
    // this.transform.position = new Vector2(
    //   this.transform.position.x + this.velocity.x,
    //   this.transform.position.y + this.velocity.y,
    // );
    this.transform.translate(this.velocity);
    // console.log(`Transform after: ${this.transform.x}`);

    this.keybindModule?.perform();

    // console.log(this.spriteRenderer);
    this.animator.render();
  }
}