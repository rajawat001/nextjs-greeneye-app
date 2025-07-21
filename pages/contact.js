import Head from 'next/head'
import Contact from '@/components/Contact'

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us | GreenEye</title>
        <meta
          name="description"
          content="We're here to answer your questions and welcome your feedback. Reach out to GreenEye for any inquiries or support."
        />
        <meta property="og:title" content="Contact Us | GreenEye" />
        <meta
          property="og:description"
          content="We're here to answer your questions and welcome your feedback. Reach out to GreenEye for any inquiries or support."
        />
        <meta property="og:type" content="website" />

        {/* Uncomment below once actual URLs are available */}
        {/*
        <link rel="canonical" href="https://greeneye.foundation/contact" />
        <meta property="og:image" content="https://greeneye.foundation/assets/contact-og-image.jpg" />
        <meta property="og:url" content="https://greeneye.foundation/contact" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@greeneyeorg" />
        <meta name="twitter:title" content="Contact Us | GreenEye" />
        <meta name="twitter:description" content="We're here to answer your questions and welcome your feedback." />
        <meta name="twitter:image" content="https://greeneye.foundation/assets/contact-og-image.jpg" />
        */}
      </Head>

      <section className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>
            We're here to answer your questions and welcome your feedback.
          </p>
        </div>
      </section>

      <Contact />
    </>
  )
}
