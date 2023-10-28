import NavbarTop from '@/components/layout/navbar-top';
import Footer from '@/components/layout/footer';
import { navbarLinks } from '@/data/links';

const Component = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <NavbarTop links={navbarLinks} />
      </header>

      <main className="container-fluid bg-secondary">
        {children}
      </main>

      <Footer className="mt-auto" />
    </div>
  );
};

export default Component;
