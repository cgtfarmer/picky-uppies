import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';
import Game from '@/lib/game';

const Page = () => {

  const containerId = 'container';

  useEffect(() => {
    const game = Game.getInstance(containerId);
  }, []);

  return (
    <Container id={containerId} className="mt-3"></Container>
  );
};

export default Page;
