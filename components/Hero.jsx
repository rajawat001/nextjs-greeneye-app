"use client";
import React from "react";
import { useRouter } from "next/router";

const Hero = () => {
  const router = useRouter(); // Next.js routing hook

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <img
          src="https://pixabay.com/get/g6160ab0932297547c6b89d675a1550ee2a684f87e0ad077d548cfeadf5784fa7524acbfb904790f1583fa42f56dd16e535f57b65913deb5d063e709b86fd1ba2_1280.jpg"
          alt="Green Forest"
          className="hero-img"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-title-main">Plant Today,</span>
          <span className="hero-title-sub">Breathe Tomorrow</span>
        </h1>
        <p className="hero-description">
          Join our mission to combat climate change through massive tree plantation drives and environmental conservation initiatives across the globe.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={() => router.push("/volunteer")}>
            <i className="fas fa-hands-helping"></i>
            Join Our Mission
          </button>
          <button className="btn btn-secondary" onClick={() => router.push("/donate")}>
            <i className="fas fa-heart"></i>
            Contribute
          </button>
        </div>
      </div>

      <div className="hero-stats">
        <div className="stat-item">
          <span className="stat-number" data-target="50000">0</span>
          <span className="stat-label">Trees Planted</span>
        </div>
        <div className="stat-item">
          <span className="stat-number" data-target="1200">0</span>
          <span className="stat-label">Volunteers</span>
        </div>
        <div className="stat-item">
          <span className="stat-number" data-target="25">0</span>
          <span className="stat-label">Cities Covered</span>
        </div>
      </div>

      <div
        className="plant-image-wrapper"
        onClick={() => router.push("/plantshop")}
        role="button"
        aria-label="Click to explore plant info"
      >
        <img
          src="/assets/plant.png"
          alt="Decorative Plant"
          className="plant-image"
        />
      </div>
    </section>
  );
};

export default Hero;
