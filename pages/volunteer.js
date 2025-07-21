import Head from 'next/head'
import Volunteer from '@/components/Volunteer'

export default function VolunteerPage() {
  return (
    <>
      <Head>
        <title>Volunteer with Us | GreenEye</title>
        <meta
          name="description"
          content="Become part of a movement for a greener planet. Sign up today to volunteer with GreenEye."
        />
        <meta property="og:title" content="Volunteer with Us | GreenEye" />
        <meta
          property="og:description"
          content="Become part of a movement for a greener planet. Sign up today to volunteer with GreenEye."
        />
        <meta property="og:type" content="website" />
        {/* Add canonical or Twitter meta if needed later */}
      </Head>

      <section className="page-header">
        <div className="container">
          <h1>Volunteer with Us</h1>
          <p>Become part of a movement for a greener planet. Sign up today!</p>
        </div>
      </section>

      <Volunteer />
    </>
  )
}
