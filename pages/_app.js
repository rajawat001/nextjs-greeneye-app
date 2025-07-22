import '@/styles/globals.css';
import '@/styles/auth-styles.css';
import '@/styles/admin.css';

import Layout from '@/components/Layout';
import BackToTop from "@/components/BackToTop";
import Notification from "@/components/Notification";
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* ✅ Razorpay Checkout Script (loaded asynchronously) */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <Notification /> {/* ✅ Global Notification */}
      <Layout>
        <Component {...pageProps} />
        <BackToTop />
      </Layout>
    </>
  );
}
