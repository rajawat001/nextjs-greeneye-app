import React from "react";
import Head from "next/head";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Donate from "@/components/Donate";
import Impact from "@/components/Impact";
import Contact from "@/components/Contact";
import Volunteer from "@/components/Volunteer";
import Programs from "@/components/Programs";
import BlogIndex from "@/components/BlogIndex";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>GreenEye Foundation | Home</title>
        <meta name="description" content="GreenEye Foundation - Making the planet greener through community-driven plantation and environmental care." />
        <meta property="og:title" content="GreenEye Foundation" />
        <meta property="og:description" content="Join us in our mission to plant trees and protect the planet." />
        <meta property="og:type" content="website" />
      </Head>

      <Hero />
      <About />
      <BlogIndex/>
      <Donate />
      <Volunteer/>
      <Programs/>
      <Impact />
      <Contact />
    </>
  );
};

export default HomePage;
