import { useTranslations } from 'next-intl';
import dynamic from "next/dynamic";
import Seo from '@/components/common/Seo';

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: require(`../locales/${locale}.json`),
      locale,
    }
  }
}

const Checkout = dynamic(() => import("@/components/Checkout"), { ssr: false });

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  return (
    <>
      <Seo
        title={t('seoTitle', { defaultMessage: 'Checkout | GreenEye' })}
        description={t('seoDescription', { defaultMessage: 'Securely complete your plant order or donation.' })}
        ogTitle={t('seoTitle', { defaultMessage: 'Checkout | GreenEye' })}
        ogDescription={t('seoDescription', { defaultMessage: 'Securely complete your plant order or donation.' })}
        canonical="https://greeneye.foundation/checkout"
      />
      <Checkout />
    </>
  );
}