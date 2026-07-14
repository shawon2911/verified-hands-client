// packages/frontend/src/layouts/MainLayout.tsx

import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  const location = useLocation();
     const excludeRoutes = ["/login", "/register"]; 
     const shouldHideLayout = excludeRoutes.includes(location.pathname);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
       {!shouldHideLayout && <Footer />}
    </div>
  );
};

export default MainLayout;