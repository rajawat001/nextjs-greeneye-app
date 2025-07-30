import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { showNotification } from "@/components/Notification";
import { useTranslations } from "next-intl";

const Login = ({ onSwitch, onLogin }) => {
  const t = useTranslations("login");
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const router = useRouter();

  const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const togglePassword = () => setShowPwd((v) => !v);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailValid(form.email)) {
      showNotification(t("invalidEmail"), "error");
      return;
    }
    if (!form.password) {
      showNotification(t("enterPassword"), "error");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/login`,
        {
          email: form.email,
          password: form.password,
        }
      );

      if (data.token) {
        localStorage.setItem("authToken", data.token);
        showNotification(t("loginSuccess"), "success");
        router.push("/profile");
      }

      if (onLogin) onLogin(data);

      setForm({ email: "", password: "", remember: false });
    } catch (error) {
      showNotification(
        error.response?.data?.message || t("invalidCredentials"),
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" id="loginForm" onSubmit={handleSubmit} autoComplete="off">
      <h3>{t("signInTitle")}</h3>
      <div className="form-group">
        <input
          type="email"
          id="loginEmail"
          name="email"
          placeholder={t("emailPlaceholder")}
          value={form.email}
          onChange={handleChange}
          className={form.email && !isEmailValid(form.email) ? "invalid" : ""}
          required
        />
        <i className="fas fa-envelope"></i>
      </div>
      <div className="form-group">
        <input
          type={showPwd ? "text" : "password"}
          id="loginPassword"
          name="password"
          placeholder={t("passwordPlaceholder")}
          value={form.password}
          onChange={handleChange}
          required
        />
        <i className="fas fa-lock"></i>
        <button
          type="button"
          className="password-toggle"
          onClick={togglePassword}
          tabIndex={-1}
          aria-label={showPwd ? t("hidePassword") : t("showPassword")}
        >
          <i className={`fas ${showPwd ? "fa-eye-slash" : "fa-eye"}`}></i>
        </button>
      </div>
      <div className="form-options">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="remember"
            checked={form.remember}
            onChange={handleChange}
          />
          <span className="checkmark"></span>
          {t("rememberMe")}
        </label>
        <a href="#" className="link" tabIndex={-1}>
          {t("forgotPassword")}
        </a>
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-full"
        disabled={loading}
      >
        {loading ? (
          <>
            <i className="fas fa-spinner fa-spin"></i> {t("signingIn")}
          </>
        ) : (
          <>
            <i className="fas fa-sign-in-alt"></i> {t("signInBtn")}
          </>
        )}
      </button>
      <div className="divider" style={{ margin: "2rem 0" }}>
        <span>{t("or")}</span>
      </div>
      <button
        type="button"
        className="btn social-btn google-btn btn-full"
        onClick={() =>
          showNotification(t("googleLoginMsg"), "info")
        }
      >
        <i className="fab fa-google"></i> {t("signInWithGoogle")}
      </button>
      <div className="auth-switch">
        <p>
          {t("newToGreenEye")}{" "}
          <button
            className="link-btn"
            type="button"
            onClick={() => router.push("/register")}
          >
            {t("createAccount")}
          </button>
        </p>
      </div>
    </form>
  );
};

export default Login;