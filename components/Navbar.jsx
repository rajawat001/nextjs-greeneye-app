"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/impact", label: "Impact" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/donate", label: "Donate" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));
  const [userName, setUserName] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const router = useRouter();
  const navMenuRef = useRef();

  // Close menu on route change
  useEffect(() => setMenuActive(false), [router.pathname]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navbar");
      if (window.scrollY > 100) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync auth across tabs
  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(!!localStorage.getItem("authToken"));
    window.addEventListener("storage", checkAuth);
    checkAuth();
    return () => window.removeEventListener("storage", checkAuth);
  }, [router.pathname]);

  // Fetch user name
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (isLoggedIn && token) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUserName(res.data.name || "Profile");
          setUserInfo(res.data || {});
        })
        .catch(() => setUserName("Profile"));
    } else {
      setUserName("");
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUserName("");
    router.push("/login");
  };

  const isActive = (path) => router.pathname === path;

  return (
    <nav className="navbar" id="navbar">
      <div className="nav-container">
        <Link href="/" className="nav-logo" style={{ textDecoration: "none", color: "inherit" }}>
          <i className="fas fa-seedling"></i>
          <span>GreenEye</span>
        </Link>

        <ul ref={navMenuRef} className={`nav-menu${menuActive ? " active" : ""}`} id="nav-menu">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={`nav-link${isActive(link.href) ? " active" : ""}`}>
                {link.label}
              </Link>
            </li>
          ))}

          {isLoggedIn && (
            <li>
              <Link href="/profile" className={`nav-link${isActive("/profile") ? " active" : ""}`}>
                <i className="fas fa-user-circle" style={{ marginRight: 5 }}></i>
                {userName || "Profile"}
              </Link>
            </li>
          )}

          {!isLoggedIn && (
            <li>
              <Link href="/register" className={`nav-link${isActive("/register") ? " active" : ""}`}>
                Register
              </Link>
            </li>
          )}

          {isLoggedIn ? (
            <li>
              <button
                className="nav-link btn-link"
                onClick={handleLogout}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
              >
                <i className="fas fa-sign-out-alt" style={{ marginRight: 5 }}></i>
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link href="/login" className={`nav-link${isActive("/login") ? " active" : ""}`}>
                <i className="fas fa-sign-in-alt" style={{ marginRight: 5 }}></i>
                Login
              </Link>
            </li>
          )}

          {isLoggedIn && userInfo?.isAdmin && (
            <li>
              <Link href="/admin" className={`nav-link${isActive("/admin") ? " active" : ""}`}>
                <i className="fas fa-user-shield" style={{ marginRight: 5 }}></i>
                Admin
              </Link>
            </li>
          )}
        </ul>

        <div
          className={`hamburger${menuActive ? " active" : ""}`}
          id="hamburger"
          onClick={() => setMenuActive((a) => !a)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
