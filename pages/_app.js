import '@/styles/globals.css';
import '@/styles/auth-styles.css';
import '@/styles/admin.css';

import Layout from '@/components/Layout';
import BackToTop from "@/components/BackToTop";
import Notification from "@/components/Notification";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Notification /> {/* ✅ Mount globally */}
      <Layout>
        <Component {...pageProps} />
        <BackToTop />
      </Layout>
    </>
  );
}
