import { Outlet } from 'react-router-dom';
import NavBar from '../componentes/UI/NavBar.jsx';
import Footer from '../componentes/UI/Footer.jsx';
import BotonPrincipal from '../componentes/UI/BotonPrincipal.jsx';

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
