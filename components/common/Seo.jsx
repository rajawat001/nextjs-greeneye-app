// components/common/Seo.jsx
import Head from 'next/head';

export default function Seo({
  title,
  description,
  ogTitle,
  ogDescription,
  ogType = "website",
  ogImage = "/assets/GreenLandscape.png",
  ogUrl = "https://greeneye.foundation",
  canonical
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  )
}