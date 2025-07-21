import Head from 'next/head'
import About from '@/components/About'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us | GreenEye Foundation</title>
        <meta name="description" content="Learn more about GreenEye, our mission, and our impact on the environment." />
      </Head>
      <About />
    </>
  )
}
