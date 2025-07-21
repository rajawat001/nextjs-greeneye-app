import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Navbar = dynamic(() => import('./Navbar'), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false });

const Layout = ({ children, title = 'GreenEye' }) => {
  const [showLayout, setShowLayout] = useState(true);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {showLayout && <Navbar />}
      <main>{children}</main>
      {showLayout && <Footer />}
    </>
  );
};

export default Layout;
