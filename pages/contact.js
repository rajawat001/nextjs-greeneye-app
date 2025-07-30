import { useTranslations } from 'next-intl';
import Seo from '@/components/common/Seo';
import Contact from '@/components/Contact';

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: require(`../locales/${locale}.json`),
      locale,
    }
  }
}

export default function ContactPage() {
  const t = useTranslations('contact');
  return (
    <>
      <Seo
        title={t('seoTitle', { defaultMessage: 'Contact Us | GreenEye' })}
        description={t('seoDescription', { defaultMessage: "We're here to answer your questions and welcome your feedback. Reach out to GreenEye for any inquiries or support." })}
        ogTitle={t('seoTitle', { defaultMessage: 'Contact Us | GreenEye' })}
        ogDescription={t('seoDescription', { defaultMessage: "We're here to answer your questions and welcome your feedback. Reach out to GreenEye for any inquiries or support." })}
        canonical="https://greeneye.foundation/contact"
      />
      <section className="page-header">
        <div className="container">
          <h1>{t('pageTitle', { defaultMessage: 'Contact Us' })}</h1>
          <p>{t('pageSubtitle', { defaultMessage: "We're here to answer your questions and welcome your feedback." })}</p>
        </div>
      </section>
      <Contact />
    </>
  );
}