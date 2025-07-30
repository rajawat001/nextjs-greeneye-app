//'use client';

import Login from '@/components/Auth/Login';
import { useTranslations } from 'next-intl';
import { IntlProvider } from 'next-intl';

// Export getStaticProps to fetch translation messages
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: require(`../locales/${locale}.json`)
    }
  };
}

// Accept messages as props and pass them to IntlProvider
export default function LoginPage({ messages, locale }) {
  const t = useTranslations('auth');

  return (
    <IntlProvider messages={messages} locale={locale}>
      <div className="auth-container">
        <div className="auth-wrapper">
          <div className="auth-section" id="loginSection">
            {/* Optional: Pass translations if needed */}
            {/* <Login
              emailLabel={t('email')}
              passwordLabel={t('password')}
              loginButton={t('login')}
              forgotPassword={t('forgotPassword')}
            /> */}
            <Login />
          </div>
        </div>
      </div>
    </IntlProvider>
  );
}
