import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';
import ElementAccessor from '@/lib/accessor/element-accessor';
import GameFactory from '@/lib/engine/factory/game-factory';
import CanvasDisplay from '@/lib/engine/model/display/canvas-display';

const Page = () => {

  const containerId = 'container';

  useEffect(() => {
    const container: Element | null = ElementAccessor.getInstance().get(containerId);

    if (!container) return;

    const canvasDisplay = CanvasDisplay.getInstance();

    container.insertAdjacentElement('beforeend', canvasDisplay.getHtmlCanvasElement());

    const game = GameFactory.getInstance(canvasDisplay).createDefault();
    game.start();
  }, []);

  return (
    <Container id={containerId} className="mt-3"></Container>
  );
};

export default Page;
