import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useRouter } from 'next/router';

const matchesCurrentPath = (router, path) => {
  const currentPath = router.asPath;

  // console.log(`matchesCurrentPath (${currentPath}, ${path}`);

  return [path, `${path}/`].includes(currentPath);
};

const Component = ({ links }) => {
  const router = useRouter();

  const navLinks = links.internal.map((link) => {
    return (
      <Link key={link.name} href={link.path} passHref legacyBehavior>
        <Nav.Link active={matchesCurrentPath(router, link.path)}>
          {link.name}
        </Nav.Link>
      </Link>
    );
  });

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="px-3">
      <Link href="/" passHref legacyBehavior>
        <Navbar.Brand>Picky Uppies</Navbar.Brand>
      </Link>

      <Navbar.Toggle aria-controls="navbar-top" />

      <Navbar.Collapse id="navbar-top">
        <Nav className="me-auto">
          {navLinks}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Component;
