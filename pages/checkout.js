// pages/checkout.js
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the Checkout component to avoid SSR issues (if any)
const Checkout = dynamic(() => import("@/components/Checkout"), { ssr: false });

const CheckoutPage = () => {
  return <Checkout />;
};

export default CheckoutPage;
