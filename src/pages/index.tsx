import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';
import DomAccessor from '@/lib/accessor/dom-accessor';
import GameFactory from '@/lib/engine/model/game/game-factory';
import DisplayFactory from '@/lib/engine/model/display/display-factory';
import CanvasDisplay from '@/lib/engine/model/display/canvas-display';
import Game from '@/lib/engine/model/game/game';

const Page = () => {

  const containerId: string = 'container';
  const canvasId: string = 'canvas';

  useEffect(() => {
    const container: Element | null = DomAccessor.getInstance().get(containerId);

    if (!container) return;

    const display: CanvasDisplay = DisplayFactory.getInstance().createCanvas();

    const canvas: Element | null = DomAccessor.getInstance().get(canvasId);

    if (canvas == null)
      container.insertAdjacentElement('beforeend', display.getHtmlCanvasElement());

    // const game = GameFactory.getInstance().createDefault();
    const game: Game = Game.getInstance();
    game.setDisplay(display);
    game.start();
  }, []);

  return (
    <Container id={containerId} className="mt-3"></Container>
  );
};

export default Page;
