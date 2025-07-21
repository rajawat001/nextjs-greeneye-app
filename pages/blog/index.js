import Head from "next/head";
import BlogIndex from "@/components/BlogIndex";

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>Blog | GreenEye</title>
        <meta name="description" content="Read the latest news and stories from GreenEye." />
      </Head>
      <BlogIndex />
    </>
  );
}
