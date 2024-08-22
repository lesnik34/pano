import React from 'react';

import Footer from '@components/global/footer';
import Header from '@components/global/header';
import Metrika from '@components/global/metrika';
import GTM from '@components/global/gtm';

interface LayoutI {
  children: JSX.Element | React.ReactNode;
  navHidden?: boolean;
}

const Layout: React.FC<LayoutI> = ({ children, navHidden }) => (
  <>
    <Header navHidden={navHidden} />

    <Metrika />
    <GTM />

    <main>{children}</main>

    <Footer />
  </>
);

export default Layout;
