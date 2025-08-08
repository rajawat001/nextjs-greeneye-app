// pages/otp-login.jsx

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { showNotification } from "@/components/Notification";

const OtpLogin = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async () => {
    if (!mobile.match(/^\d{10}$/)) {
      showNotification("Please enter a valid 10-digit mobile number", "error");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/otp/send`, { phone: mobile });
      showNotification("OTP sent successfully", "success");
      setOtpSent(true);
    } catch (error) {
      showNotification(error.response?.data?.message || "Failed to send OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.match(/^\d{4,6}$/)) {
      showNotification("Please enter a valid OTP", "error");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/otp/login`, { phone: mobile, otp });
      localStorage.setItem("authToken", data.token);
      showNotification("Login successful", "success");
      router.push("/profile");
    } catch (error) {
      showNotification(error.response?.data?.message || "Invalid OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="auth-container">
        <form className="auth-form" id="otpLoginForm" onSubmit={(e) => e.preventDefault()} autoComplete="off">
          <h3>Sign in with OTP</h3>

          <div className="form-group">
            <input
              type="tel"
              name="mobile"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
            <i className="fas fa-phone"></i>
          </div>

          {otpSent && (
            <div className="form-group">
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <i className="fas fa-key"></i>
            </div>
          )}

          {!otpSent ? (
            <button className="btn btn-primary btn-full" onClick={handleSendOtp} disabled={loading}>
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Sending OTP...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i> Send OTP
                </>
              )}
            </button>
          ) : (
            <>
              <button className="btn btn-primary btn-full" onClick={handleVerifyOtp} disabled={loading}>
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Verifying...
                  </>
                ) : (
                  <>
                    <i className="fas fa-unlock-alt"></i> Verify OTP
                  </>
                )}
              </button>

              <button
                type="button"
                className="btn btn-link"
                onClick={handleSendOtp}
                disabled={loading}
                style={{ marginTop: "1rem" }}
              >
                Resend OTP
              </button>
            </>
          )}

          <div className="auth-switch" style={{ marginTop: "2rem" }}>
            <p>
              Go back to{" "}
              <button
                className="link-btn"
                type="button"
                onClick={() => router.push("/login")}
              >
                Email/Password Login
              </button>
            </p>
          </div>
        </form>
      </div>
  );
};

export default OtpLogin;
