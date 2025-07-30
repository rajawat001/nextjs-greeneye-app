// pages/legal/privacy-policy.js

import React from "react";
import PrivacyPolicy from "@/components/Legal/PrivacyPolicy";
import { IntlProvider } from "next-intl";

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: require(`../../locales/${locale}.json`)
    }
  };
}

/**
 * Privacy Policy standalone page
 */
const PrivacyPolicyPage = ({ messages }) => {
  return (
    <IntlProvider messages={messages}>
      <PrivacyPolicy />
    </IntlProvider>
  );
};

export default PrivacyPolicyPage;
