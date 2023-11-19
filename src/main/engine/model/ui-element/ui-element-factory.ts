import Animator from '../animator/animator';
import Bounds from '../bounds';
import GameObject from '../game-object';
import RectangleSpriteCanvasRenderer
  from '../sprite-renderer/canvas/rectangle-sprite-canvas-renderer';
import TextSpriteCanvasRenderer from '../sprite-renderer/canvas/text-sprite-canvas-renderer';
import RectangleSprite from '../sprite/canvas/rectangle-sprite';
import TextSprite from '../sprite/canvas/text-sprite';
import Vector2 from '../vector2';
import UiElement from './ui-element';

export default class UiElementFactory {

  private static singleton: UiElementFactory;

  public static getInstance(): UiElementFactory {
    if (this.singleton != null) return this.singleton;

    this.singleton = new UiElementFactory();
    return this.singleton;
  }

  public createButtonElement(bounds: Bounds): UiElement {
    const sprite: RectangleSprite = new RectangleSprite(bounds, true, 2, '#666666', '#000000');

    const spriteRenderer: RectangleSpriteCanvasRenderer = new RectangleSpriteCanvasRenderer();

    const animator: Animator = new Animator(spriteRenderer, [sprite]);

    const uiElement: UiElement = new UiElement(animator);

    return uiElement;
  }

  public createTextElement(center: Vector2, content: string, fontSize: number): UiElement {
    const sprite: TextSprite = new TextSprite(
      center, content, fontSize, 'Georgia', 'center', true, 0.5, '#ffffff', '#000000'
    );

    const spriteRenderer: TextSpriteCanvasRenderer = new TextSpriteCanvasRenderer();

    const animator: Animator = new Animator(spriteRenderer, [sprite]);

    return new UiElement(animator);
  }

  // public createCounter(center: Vector2): UiElement {
  //   const sprite: TextSprite = new TextSprite(
  //     center, '0 / 10', 84, 'Georgia', 'end', true, 0.5, '#ffffff', '#000000'
  //   );

  //   const spriteRenderer: TextSpriteCanvasRenderer = new TextSpriteCanvasRenderer();

  //   const animator: Animator = new Animator(spriteRenderer, [sprite]);

  //   const uiElement: UiElement = new UiElement(animator);

  //   return uiElement;
  // }
}
