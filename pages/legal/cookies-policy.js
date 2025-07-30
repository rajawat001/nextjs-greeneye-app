// pages/legal/cookies-policy.js

import React from "react";
import CookiesPolicy from "@/components/Legal/CookiesPolicy";
import { IntlProvider } from "next-intl";

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: require(`../../locales/${locale}.json`)
    }
  };
}

const CookiesPolicyPage = ({ messages }) => {
  return (
    <IntlProvider messages={messages}>
      <CookiesPolicy />
    </IntlProvider>
  );
};

export default CookiesPolicyPage;
