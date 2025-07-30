"use client";
import React from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

const Hero = () => {
  const router = useRouter(); // Next.js routing hook
  const t = useTranslations("hero");

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <img
          src="https://pixabay.com/get/g6160ab0932297547c6b89d675a1550ee2a684f87e0ad077d548cfeadf5784fa7524acbfb904790f1583fa42f56dd16e535f57b65913deb5d063e709b86fd1ba2_1280.jpg"
          alt={t("heroImgAlt")}
          className="hero-img"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-title-main">{t("titleMain")}</span>
          <span className="hero-title-sub">{t("titleSub")}</span>
        </h1>
        <p className="hero-description">
          {t("description")}
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={() => router.push("/volunteer")}>
            <i className="fas fa-hands-helping"></i>
            {t("joinMission")}
          </button>
          <button className="btn btn-secondary" onClick={() => router.push("/donate")}>
            <i className="fas fa-heart"></i>
            {t("contribute")}
          </button>
        </div>
      </div>

      <div className="hero-stats">
        <div className="stat-item">
          <span className="stat-number" data-target="50000">0</span>
          <span className="stat-label">{t("statTrees")}</span>
        </div>
        <div className="stat-item">
          <span className="stat-number" data-target="1200">0</span>
          <span className="stat-label">{t("statVolunteers")}</span>
        </div>
        <div className="stat-item">
          <span className="stat-number" data-target="25">0</span>
          <span className="stat-label">{t("statCities")}</span>
        </div>
      </div>

      <div
        className="plant-image-wrapper"
        onClick={() => router.push("/plantshop")}
        role="button"
        aria-label={t("plantBtnAria")}
      >
        <img
          src="/assets/plant.png"
          alt={t("plantImgAlt")}
          className="plant-image"
        />
      </div>
    </section>
  );
};

export default Hero;