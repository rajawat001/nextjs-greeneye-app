import Head from 'next/head';
import { useState } from 'react';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, title = "GreenEye" }) => {
  const [showLayout, setShowLayout] = useState(true);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '5px 5px 0 0',
        background: 'white',
      }}>
        <LanguageSwitcher />
      </div>

      {showLayout && <Navbar />}
      <main>{children}</main>
      {showLayout && <Footer />}
    </>
  );
};

export default Layout;
