'use client';
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { showNotification } from "@/components/Notification";

const Register = ({ onSwitch }) => {
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
  const router = useRouter(); // ✅ useRouter instead of useNavigate

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
      showNotification("Passwords do not match!", "error");
      return;
    }

    if (!isPasswordStrong(form.password)) {
      showNotification(
        "Password must be at least 8 characters with uppercase, lowercase, and number",
        "error"
      );
      return;
    }

    if (!form.agreeTerms) {
      showNotification("Please agree to Terms & Conditions", "error");
      return;
    }

    if (!isEmailValid(form.email)) {
      showNotification("Please enter a valid email address.", "error");
      return;
    }

    if (!isPhoneValid(form.phone)) {
      showNotification("Please enter a valid phone number.", "error");
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
        showNotification("Account created successfully.", "success");
        router.push("/profile"); // ✅ Next.js routing
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
        "Registration failed. Please try again.";
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
              alt="WhatsApp QR Code"
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
              <i className="fab fa-whatsapp"></i> Register with WhatsApp
            </h3>
            <ol>
              <li>Open WhatsApp on your phone</li>
              <li>Tap the camera icon</li>
              <li>Send "hi" message to start registration</li>
            </ol>
            <div className="whatsapp-benefits">
              <div className="benefit">
                <i className="fas fa-bolt"></i> <span>Instant Registration</span>
              </div>
              <div className="benefit">
                <i className="fas fa-bell"></i> <span>Event Notifications</span>
              </div>
              <div className="benefit">
                <i className="fas fa-users"></i> <span>Community Updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="divider">
        <span>OR</span>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <h3>Register with Email</h3>

        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
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
              placeholder="Last Name"
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
            placeholder="Email Address"
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
            placeholder="Phone Number"
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
            placeholder="Create Password"
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
          >
            <i className={`fas ${showPwd ? "fa-eye-slash" : "fa-eye"}`}></i>
          </button>
        </div>

        <div className="form-group">
          <input
            type={showConfirmPwd ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
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
            I agree to the{" "}
            <Link href="/legal/terms-of-service" className="link">Terms & Conditions</Link>{" "}
            and{" "}
            <Link href="/legal/privacy-policy" className="link">Privacy Policy</Link>
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
            Subscribe to our newsletter for environmental updates
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Creating Account...
            </>
          ) : (
            <>
              <i className="fas fa-user-plus"></i> Create Account
            </>
          )}
        </button>
      </form>

      <div className="auth-switch">
        <p>
          Already have an account?{" "}
          <button
            className="link-btn"
            type="button"
            onClick={() => router.push("/login")}
          >
            Sign In
          </button>
        </p>
      </div>
    </>
  );
};

export default Register;
