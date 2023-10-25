import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';
import ElementAccessor from '@/lib/accessor/element-accessor';
import GameFactory from '@/lib/factories/game-factory';
import Canvas from '@/lib/models/canvas';

const Page = () => {

  const containerId = 'container';

  useEffect(() => {
    const container: Element | null = ElementAccessor.getInstance().get(containerId);

    if (!container) return;

    const canvas = new Canvas(container, 1360, 765, '#888888');

    const game = GameFactory.getInstance().createDefault(canvas);
  }, []);

  return (
    <Container id={containerId} className="mt-3"></Container>
  );
};

export default Page;
