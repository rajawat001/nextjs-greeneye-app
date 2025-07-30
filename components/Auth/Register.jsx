//'use client';
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { showNotification } from "@/components/Notification";
import { useTranslations } from "next-intl";

const Register = ({ onSwitch }) => {
  const t = useTranslations("register");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    newsletter: false,
  });

  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneValid = (phone) =>
    /^[+]?[1-9][\d]{9,15}$/.test(phone.replace(/\s/g, ""));
  const isPasswordStrong = (pwd) =>
    pwd.length >= 8 && /[A-Z]/.test(pwd) && /[a-z]/.test(pwd) && /\d/.test(pwd);
  const isPasswordMatch = form.password === form.confirmPassword;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const togglePassword = (type) => {
    if (type === "password") setShowPwd((v) => !v);
    if (type === "confirm") setShowConfirmPwd((v) => !v);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordMatch) {
      showNotification(t("pwdNoMatch"), "error");
      return;
    }

    if (!isPasswordStrong(form.password)) {
      showNotification(t("pwdWeak"), "error");
      return;
    }

    if (!form.agreeTerms) {
      showNotification(t("agreeTermsMsg"), "error");
      return;
    }

    if (!isEmailValid(form.email)) {
      showNotification(t("invalidEmail"), "error");
      return;
    }

    if (!isPhoneValid(form.phone)) {
      showNotification(t("invalidPhone"), "error");
      return;
    }

    setLoading(true);

    const payload = {
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      password: form.password,
      phone: form.phone,
    };

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/register`,
        payload
      );

      if (data.token) {
        localStorage.setItem("authToken", data.token);
        showNotification(t("registerSuccess"), "success");
        router.push("/profile");
      }

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
        newsletter: false,
      });

      if (onSwitch) setTimeout(() => onSwitch(), 1000);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        t("registerFail");
      showNotification(errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="whatsapp-section">
        <div className="qr-container">
          <div className="qr-code">
            <img
              src="/assets/whatsappQR.png"
              alt={t("whatsappQRAlt")}
              className="qr-image"
              onError={(e) => {
                e.target.style.display = "none";
                if (e.target.nextSibling)
                  e.target.nextSibling.style.display = "block";
              }}
            />
            <div className="qr-fallback" style={{ display: "none" }}>
              <i className="fab fa-whatsapp"></i>
              <p>QR Code</p>
            </div>
          </div>
          <div className="qr-instructions">
            <h3>
              <i className="fab fa-whatsapp"></i> {t("registerWithWhatsapp")}
            </h3>
            <ol>
              <li>{t("waStep1")}</li>
              <li>{t("waStep2")}</li>
              <li>{t("waStep3")}</li>
            </ol>
            <div className="whatsapp-benefits">
              <div className="benefit">
                <i className="fas fa-bolt"></i> <span>{t("waInstant")}</span>
              </div>
              <div className="benefit">
                <i className="fas fa-bell"></i> <span>{t("waNotif")}</span>
              </div>
              <div className="benefit">
                <i className="fas fa-users"></i> <span>{t("waCommunity")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="divider">
        <span>{t("or")}</span>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <h3>{t("registerWithEmail")}</h3>

        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              placeholder={t("firstName")}
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <i className="fas fa-user"></i>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="lastName"
              placeholder={t("lastName")}
              value={form.lastName}
              onChange={handleChange}
              required
            />
            <i className="fas fa-user"></i>
          </div>
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder={t("email")}
            value={form.email}
            onChange={handleChange}
            required
            className={form.email && !isEmailValid(form.email) ? "invalid" : ""}
          />
          <i className="fas fa-envelope"></i>
        </div>

        <div className="form-group">
          <input
            type="tel"
            name="phone"
            placeholder={t("phone")}
            value={form.phone}
            onChange={handleChange}
            required
            className={form.phone && !isPhoneValid(form.phone) ? "invalid" : ""}
          />
          <i className="fas fa-phone"></i>
        </div>

        <div className="form-group">
          <input
            type={showPwd ? "text" : "password"}
            name="password"
            placeholder={t("createPwd")}
            value={form.password}
            onChange={handleChange}
            required
            className={form.password && !isPasswordStrong(form.password) ? "invalid" : ""}
          />
          <i className="fas fa-lock"></i>
          <button
            type="button"
            className="password-toggle"
            onClick={() => togglePassword("password")}
            aria-label={showPwd ? t("hidePassword") : t("showPassword")}
          >
            <i className={`fas ${showPwd ? "fa-eye-slash" : "fa-eye"}`}></i>
          </button>
        </div>

        <div className="form-group">
          <input
            type={showConfirmPwd ? "text" : "password"}
            name="confirmPassword"
            placeholder={t("confirmPwd")}
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className={
              form.confirmPassword && !isPasswordMatch ? "invalid" : ""
            }
          />
          <i className="fas fa-lock"></i>
          <button
            type="button"
            className="password-toggle"
            onClick={() => togglePassword("confirm")}
            aria-label={showConfirmPwd ? t("hidePassword") : t("showPassword")}
          >
            <i className={`fas ${showConfirmPwd ? "fa-eye-slash" : "fa-eye"}`}></i>
          </button>
        </div>

        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={form.agreeTerms}
              onChange={handleChange}
              required
            />
            <span className="checkmark"></span>
            {t("agreeMsg1")}{" "}
            <Link href="/legal/terms-of-service" className="link">{t("termsLink")}</Link>{" "}
            {t("agreeMsg2")}{" "}
            <Link href="/legal/privacy-policy" className="link">{t("privacyLink")}</Link>
          </label>
        </div>

        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="newsletter"
              checked={form.newsletter}
              onChange={handleChange}
            />
            <span className="checkmark"></span>
            {t("newsletter")}
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> {t("creatingAccount")}
            </>
          ) : (
            <>
              <i className="fas fa-user-plus"></i> {t("createAccount")}
            </>
          )}
        </button>
      </form>

      <div className="auth-switch">
        <p>
          {t("alreadyHaveAccount")}{" "}
          <button
            className="link-btn"
            type="button"
            onClick={() => router.push("/login")}
          >
            {t("signIn")}
          </button>
        </p>
      </div>
    </>
  );
};

export default Register;