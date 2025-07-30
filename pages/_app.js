// pages/_app.js
import '@/styles/globals.css';
import '@/styles/auth-styles.css';
import '@/styles/admin.css';

import {useEffect, useMemo, useState} from 'react';
import {useRouter} from 'next/router';
import {IntlProvider} from 'next-intl';
import Layout from '@/components/Layout';
import Notification from '@/components/Notification';
import BackToTop from '@/components/BackToTop';
import Script from 'next/script';

//  supported locales:
const SUPPORTED = ['en', 'fr', 'es', 'ar', 'zh', 'ja'];

function getPathLocale(asPath) {
  // "/ar/..." -> "ar"
  const first = asPath?.split('?')[0]?.split('#')[0]?.split('/')?.[1] || '';
  return SUPPORTED.includes(first) ? first : null;
}

export default function App({Component, pageProps}) {
  const router = useRouter();
  const isAdminRoute = router.pathname?.startsWith('/admin');

  // 1) initial messages/locale from pageProps
  const initialMessages = useMemo(
    () => (pageProps.messages ?? null),
    [pageProps.messages]
  );
  const initialLocale =
    pageProps.locale ||
    router.locale ||                  // Next i18n locale (if use)
    getPathLocale(router.asPath) ||   // URL prefix se
    'en';

  const [messages, setMessages] = useState(initialMessages);
  const [locale, setLocale] = useState(initialLocale);

  // 2) Route/locale change detect karke messages ko reload trigger karo
  useEffect(() => {
    // Prefer router.locale; warna URL prefix
    const nextLocale =
      router.locale || getPathLocale(router.asPath) || 'en';

    if (nextLocale !== locale) {
      setLocale(nextLocale);
      setMessages(null); // force re-load below
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath, router.locale]);

  // 3)If message missing then load dynamic (According to local)
  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (messages == null) {
        try {
          const mod = await import(`../locales/${locale}.json`);
          if (!cancelled) setMessages(mod.default ?? mod);
        } catch (e) {
          // fallback to English if missing
          try {
            const mod = await import(`../locales/en.json`);
            if (!cancelled) {
              setMessages(mod.default ?? mod);
              setLocale('en');
            }
          } catch {
            if (!cancelled) setMessages({}); // last resort
          }
        }
      }
    }
    load();
    return () => { cancelled = true; };
  }, [messages, locale]);

  // Jab tak messages load nahi ho jate
  if (messages == null) return null; 

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <IntlProvider
        messages={messages}
        locale={locale}
        defaultLocale="en"
        // yeh *function* hi hona chahiye (boolean nahi)
        getMessageFallback={({key/*, namespace*/}) => key}
        onError={(err) => {
          // Dev me noisy errors ko mute kar do
          if (
            err.code === 'MISSING_MESSAGE' ||
            err.code === 'ENVIRONMENT_FALLBACK'
          ) {
            if (process.env.NODE_ENV === 'development') return;
          }
          // Production me bhi ignore karna ho to yahan silent kar do
          // console.error(err);
        }}
      >
        {isAdminRoute ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Notification />
            <Component {...pageProps} />
            <BackToTop />
          </Layout>
        )}
      </IntlProvider>
    </>
  );
}
