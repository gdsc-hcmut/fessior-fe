import React from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';

type LayoutProps = {
  children: React.ReactNode;
};

function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <section>
      Layout for about page
      <Header />
      {children}
      <Footer />
    </section>
  );
}

export default Layout;
