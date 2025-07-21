import Head from 'next/head'
import Donate from '@/components/Donate'

export default function DonatePage() {
  return (
    <>
      <Head>
        <title>Support GreenEye | Donate</title>
        <meta
          name="description"
          content="Your donation helps us plant more trees and expand our environmental impact. Support GreenEye's mission for a greener planet."
        />
        <meta property="og:title" content="Support GreenEye | Donate" />
        <meta
          property="og:description"
          content="Your donation helps us plant more trees and expand our environmental impact. Support GreenEye's mission for a greener planet."
        />
        <meta property="og:type" content="website" />

        {/* Optional: Uncomment and adjust if needed */}
        {/*
        <link rel="canonical" href="https://greeneye.foundation/donate" />
        <meta property="og:image" content="https://greeneye.foundation/assets/donate-og-image.jpg" />
        <meta property="og:url" content="https://greeneye.foundation/donate" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@greeneyeorg" />
        <meta name="twitter:title" content="Support GreenEye | Donate" />
        <meta name="twitter:description" content="Your donation helps us plant more trees and expand our environmental impact." />
        <meta name="twitter:image" content="https://greeneye.foundation/assets/donate-og-image.jpg" />
        */}
      </Head>

      <section className="page-header">
        <div className="container">
          <h1>Support GreenEye</h1>
          <p>
            Your donation helps us plant more trees and expand our environmental impact.
          </p>
        </div>
      </section>

      <Donate />
    </>
  )
}
