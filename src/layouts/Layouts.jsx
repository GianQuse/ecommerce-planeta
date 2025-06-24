import { Outlet } from 'react-router-dom';
import { NavBar } from '../componentes/NavBar.jsx';
import { Footer } from '../componentes/Footer.jsx';
import { BotonPrincipal } from '../componentes/BotonPrincipal.jsx';

export function WithNavLayout() {
  return (
    <>
      <NavBar />
      <BotonPrincipal/>
      <Outlet />
      <Footer />
    </>
  );
}

export function WithoutNavLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
