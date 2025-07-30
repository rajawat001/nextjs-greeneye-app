// pages/legal/terms-of-service.js

import React from "react";
import TermsOfService from "@/components/Legal/TermsOfService";
import { IntlProvider } from "next-intl";

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: require(`../../locales/${locale}.json`)
    }
  };
}

const TermsOfServicePage = ({ messages }) => {
  return (
    <IntlProvider messages={messages}>
      <TermsOfService />
    </IntlProvider>
  );
};

export default TermsOfServicePage;
