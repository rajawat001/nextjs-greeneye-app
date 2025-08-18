// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document({ __NEXT_DATA__ }) {
  const locale = __NEXT_DATA__?.locale || 'en';

  return (
    <Html lang={locale}>
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/GreenEyeLogo.ico" />

        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* Theme */}
        <meta name="theme-color" content="#000000" />
        {/* Facebook Domain Verification */}
        <meta name="facebook-domain-verification" content="iy6g39r9edjzoymmqatbhwym5o10js" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
