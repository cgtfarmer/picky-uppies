import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';
import ElementAccessor from '@/lib/accessor/element-accessor';
import GameFactory from '@/lib/factories/game-factory';

const Page = () => {

  const containerId = 'container';

  useEffect(() => {
    const container: Element | null = ElementAccessor.getInstance().get(containerId);

    if (!container) return;

    const game = GameFactory.getInstance().createDefault(container);
  }, []);

  return (
    <Container id={containerId} className="mt-3"></Container>
  );
};

export default Page;
