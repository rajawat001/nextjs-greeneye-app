import Head from 'next/head'
import Programs from '@/components/Programs'

export default function ProgramsPage() {
  return (
    <>
      <Head>
        <title>Our Programs | GreenEye</title>
        <meta
          name="description"
          content="Explore our reforestation, education, and community initiatives. Join GreenEye's programs for a greener future."
        />
        <meta property="og:title" content="Our Programs | GreenEye" />
        <meta
          property="og:description"
          content="Explore our reforestation, education, and community initiatives. Join GreenEye's programs for a greener future."
        />
        <meta property="og:type" content="website" />
      </Head>
      <section className="page-header">
        <div className="container">
          <h1>Our Programs</h1>
          <p>Explore our reforestation, education, and community initiatives.</p>
        </div>
      </section>
      <Programs />
    </>
  )
}