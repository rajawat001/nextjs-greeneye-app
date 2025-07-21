import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

/**
 * BackToTop button with ScrollToTop behavior on route change
 */
const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [router.asPath]);

  // Show/hide button on scroll
  useEffect(() => {
    const onScroll = () => setVisible(window.pageYOffset > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      className="back-to-top visible"
      id="backToTop"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      <i className="fas fa-chevron-up"></i>
    </button>
  );
};

export default BackToTop;
