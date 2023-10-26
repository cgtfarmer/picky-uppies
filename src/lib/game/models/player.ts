import { Renderable } from '../../engine/interface/renderable';
import Character from './character';
import Inventory from './inventory';
import Sprite from '../../engine/model/sprite/sprite';
import Transform from '../../engine/model/transform';
import Vector2 from '../../engine/model/vector2';
import { SpriteRenderer } from '@/lib/engine/model/sprite-renderer/sprite-renderer';
import { InputModule } from '@/lib/engine/model/input-module/input-module';

export default class Player extends Character implements Renderable {

  private inventory: Inventory;

  private inputModule: InputModule;

  private velocity: Vector2;

  private movementSpeed: number;

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
    spriteRenderer: SpriteRenderer,
    inputModule: InputModule,
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
      sprite,
      spriteRenderer
    );

    this.inventory = inventory;
    this.inputModule = inputModule;
    this.velocity = new Vector2(0, 0);
    this.movementSpeed = 5;
  }

  public update(): void {
    // console.log('[Player#update]');
    const horizontal: number = this.inputModule.getXAxis();
    const vertical: number = this.inputModule.getYAxis();

    this.velocity = new Vector2(
      horizontal * this.movementSpeed,
      (vertical * this.movementSpeed) * -1, // This is only for HTML Canvas
    );

    // console.log(`Transform before: ${this.transform.x}`);
    this.transform.setX(this.transform.getX() + this.velocity.x);
    this.transform.setY(this.transform.getY() + this.velocity.y);
    // console.log(`Transform after: ${this.transform.x}`);

    this.spriteRenderer.render();
  }
}
