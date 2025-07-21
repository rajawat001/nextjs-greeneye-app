import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { showNotification } from "@/components/Notification"; // Ensure this is compatible with Next.js

const Login = ({ onSwitch, onLogin }) => {
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
      showNotification("Please enter a valid email address.", "error");
      return;
    }
    if (!form.password) {
      showNotification("Please enter your password.", "error");
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
        showNotification("Login successful!", "success");
        router.push("/profile");
      }

      if (onLogin) onLogin(data);

      setForm({ email: "", password: "", remember: false });
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Invalid email or password.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" id="loginForm" onSubmit={handleSubmit} autoComplete="off">
      <h3>Sign in to Your Account</h3>
      <div className="form-group">
        <input
          type="email"
          id="loginEmail"
          name="email"
          placeholder="Email Address"
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
          placeholder="Password"
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
          aria-label={showPwd ? "Hide password" : "Show password"}
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
          Remember me
        </label>
        <a href="#" className="link" tabIndex={-1}>
          Forgot password?
        </a>
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-full"
        disabled={loading}
      >
        {loading ? (
          <>
            <i className="fas fa-spinner fa-spin"></i> Signing in...
          </>
        ) : (
          <>
            <i className="fas fa-sign-in-alt"></i> Sign In
          </>
        )}
      </button>
      <div className="divider" style={{ margin: "2rem 0" }}>
        <span>OR</span>
      </div>
      <button
        type="button"
        className="btn social-btn google-btn btn-full"
        onClick={() =>
          showNotification("Google login integration would be implemented here", "info")
        }
      >
        <i className="fab fa-google"></i> Sign in with Google
      </button>
      <div className="auth-switch">
        <p>
          New to GreenEye?{" "}
          <button
            className="link-btn"
            type="button"
            onClick={() => router.push("/register")}
          >
            Create Account
          </button>
        </p>
      </div>
    </form>
  );
};

export default Login;
