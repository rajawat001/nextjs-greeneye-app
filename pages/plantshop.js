// pages/plantshop.js
import dynamic from "next/dynamic";
import { IntlProvider } from "next-intl";

const PlantShop = dynamic(() => import("../components/PlantShop"), {
  ssr: false,
});

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: require(`../locales/${locale}.json`)
    }
  };
}

export default function PlantShopPage({ messages }) {
  return (
    <IntlProvider messages={messages}>
      <PlantShop />
    </IntlProvider>
  );
}
