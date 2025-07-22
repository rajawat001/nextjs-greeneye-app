// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/GreenEyeLogo.ico" />
        
        {/* Font Awesome CSS */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-...your-integrity-if-needed..."
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="GreenEye Foundation" />
        <meta property="og:title" content="GreenEye - For a Greener Future" />
        <meta property="og:description" content="Join GreenEye in making the world greener and cleaner!" />
        <meta property="og:image" content="/assets/og-image.jpg" />
        <meta property="og:url" content="https://greeneye.foundation" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GreenEye - Eco Foundation" />
        <meta name="twitter:description" content="Support our mission to protect the planet!" />
        <meta name="twitter:image" content="/assets/og-image.jpg" />

        {/* Canonical */}
        <link rel="canonical" href="https://greeneye.foundation" />

        {/* Meta Tags */}
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using Next.js"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </Html>
  );
}
