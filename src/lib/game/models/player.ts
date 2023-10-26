import { Renderable } from '../../engine/interface/renderable';
import Character from './character';
import InputModule from '../../engine/model/input-module';
import Inventory from './inventory';
import Sprite from '../../engine/model/sprite/sprite';
import RectangleSpriteCanvasRenderer
  from '../../engine/model/sprite-renderer/canvas/rectangle-sprite-canvas-renderer';
import Transform from '../../engine/model/transform';
import Vector2 from '../../engine/model/vector2';

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
    spriteRenderer: RectangleSpriteCanvasRenderer,
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
    this.transform.x = (this.transform.x + this.velocity.x);
    this.transform.y = (this.transform.y + this.velocity.y);
    // console.log(`Transform after: ${this.transform.x}`);

    this.spriteRenderer.render();
  }
}
