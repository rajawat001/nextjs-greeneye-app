import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const BlogDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        router.push("/blog");
      });
  }, [id, router]);

  if (loading) return <div style={{ padding: 40 }}>Loading blog...</div>;
  if (!blog) return <div style={{ padding: 40 }}>Blog not found</div>;

  const metaTitle = blog.title ? `${blog.title} | GreenEye Blog` : "Blog Post | GreenEye";
  const metaDescription = blog.content?.substr(0, 160) || "Read this blog post on GreenEye.";
  const metaImage = blog.image || "/default-og-image.jpg";

  return (
    <article
      style={{
        maxWidth: 700,
        margin: "60px auto 40px auto",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
        padding: "0 0 42px 0",
        overflow: "hidden",
      }}
    >
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
      </Head>

      <Link
        href="/blog"
        style={{
          display: "inline-block",
          margin: "22px 0 0 32px",
          color: "#3ca87c",
          fontWeight: 600,
          textDecoration: "none",
          fontSize: 15,
          letterSpacing: 0.5,
        }}
      >
        &larr; Back to Blogs
      </Link>

      <header>
        <h1 style={{ margin: "24px 32px 0 32px", fontSize: "2.5rem", fontWeight: 800, letterSpacing: 1, color: "#222" }}>
          {blog.title}
        </h1>
      </header>

      {blog.image && (
        <div
          style={{
            width: "100%",
            height: 330,
            overflow: "hidden",
            marginTop: 30,
            borderRadius: "14px 14px 0 0",
            background: "#f7f9fc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Image
            src={blog.image}
            alt={blog.title}
            layout="fill"
            objectFit="contain"
            style={{ background: "transparent" }}
            priority
          />
        </div>
      )}

      <section
        style={{
          margin: "36px 32px 0 32px",
          marginRight: 44,
          fontSize: "1.15rem",
          color: "#343a40",
          lineHeight: 1.7,
          fontWeight: 400,
          letterSpacing: 0.1,
          whiteSpace: "pre-line",
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
      >
        {blog.content}
      </section>

      <footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "44px 32px 0 32px",
          color: "#888",
          fontSize: 15,
          borderTop: "1px solid #eee",
          paddingTop: 22,
        }}
      >
        <span>
          <i className="far fa-calendar-alt" style={{ marginRight: 6 }}></i>
          {new Date(blog.createdAt).toLocaleDateString()}
        </span>
        <span style={{ fontWeight: 600 }}>
          <i className="far fa-user" style={{ marginRight: 6 }}></i>
          {blog.author || "GreenEye"}
        </span>
      </footer>
    </article>
  );
};

export default BlogDetails;
