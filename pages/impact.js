import Head from 'next/head'
import Impact from '@/components/Impact'

export default function ImpactPage() {
  return (
    <>
      <Head>
        <title>Our Impact | GreenEye</title>
        <meta
          name="description"
          content="Measurable results and stories from our global reforestation journey. See how GreenEye is making a difference."
        />
        <meta property="og:title" content="Our Impact | GreenEye" />
        <meta
          property="og:description"
          content="Measurable results and stories from our global reforestation journey. See how GreenEye is making a difference."
        />
        <meta property="og:type" content="website" />
        {/* Extend with canonical/OG/Twitter as needed */}
      </Head>

      <section className="page-header">
        <div className="container">
          <h1>Our Impact</h1>
          <p>
            Measurable results and stories from our global reforestation
            journey.
          </p>
        </div>
      </section>

      <Impact />
    </>
  )
}
