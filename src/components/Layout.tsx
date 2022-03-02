import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';

const Layout: React.FC = () => (
  <>
    <main className='container'>
      <Outlet />
    </main>
    <Footer />
  </>
);

export default Layout;
