// src/components/Donate.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { showNotification } from "@/components/Notification";
import { useRouter } from "next/router";

const presetAmounts = [100, 500, 1000, 5000];

const Donate = () => {
  const [amount, setAmount] = useState("");
  const [activeBtn, setActiveBtn] = useState(null);
  const [form, setForm] = useState({
    donorName: "",
    donorEmail: "",
    donorPhone: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🟢 Auto-fill profile info if logged in
  useEffect(() => {
    const fetchProfile = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
      if (!token) return;

      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setForm((f) => ({
          ...f,
          donorName: data.name || "",
          donorEmail: data.email || "",
          donorPhone: data.phone || "",
        }));
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };

    fetchProfile();
  }, []);

  const handleAmountBtn = (amt, idx) => {
    setAmount(amt.toString());
    setActiveBtn(idx);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setActiveBtn(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || parseInt(amount, 10) < 50) {
      showNotification("Please enter a minimum donation amount of ₹50.", "error");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/donations/create`, {
        donorName: form.donorName,
        donorEmail: form.donorEmail,
        donorPhone: form.donorPhone,
        amount: parseInt(amount, 10),
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "GreenEye Donation",
        description: "Thank you for your support!",
        order_id: data.orderId,
        handler: async function (response) {
          const verifyRes = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/donations/verify`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            donationId: data.donationId,
          });

          if (verifyRes.data.success) {
            showNotification(`Thank you for donating ₹${amount}! 🌿`, "success");
            setAmount("");
            setForm({ donorName: "", donorEmail: "", donorPhone: "" });
            setActiveBtn(null);
            router.push("/mydonation");
          } else {
            showNotification("Payment verification failed. Please try again.", "error");
          }
        },
        prefill: {
          name: form.donorName,
          email: form.donorEmail,
          contact: form.donorPhone,
        },
        theme: { color: "#4CAF50" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
      showNotification("Donation failed. Please try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="donate" className="donate">
      <div className="container">
        <div className="donation-content">
          <div className="donation-info">
            <h3>How Your Donation Helps</h3>
            <div className="donation-breakdown">
              <div className="breakdown-item">
                <div className="amount">₹100</div>
                <div className="description">Plants 2 saplings with care for 1 year</div>
              </div>
              <div className="breakdown-item">
                <div className="amount">₹500</div>
                <div className="description">Supports a community plantation drive</div>
              </div>
              <div className="breakdown-item">
                <div className="amount">₹1000</div>
                <div className="description">Sponsors environmental education workshop</div>
              </div>
              <div className="breakdown-item">
                <div className="amount">₹5000</div>
                <div className="description">Funds urban reforestation project</div>
              </div>
            </div>
          </div>
          <div className="donation-form-container">
            <h3>Make a Donation</h3>
            <div className="donation-amounts">
              {presetAmounts.map((amt, idx) => (
                <button
                  key={amt}
                  className={`amount-btn${activeBtn === idx ? " active" : ""}`}
                  type="button"
                  onClick={() => handleAmountBtn(amt, idx)}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
            <form className="donation-form" id="donationForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="number"
                  id="customAmount"
                  name="amount"
                  placeholder="Enter amount (₹)"
                  min="50"
                  value={amount}
                  onChange={handleAmountChange}
                  required
                />
                <i className="fas fa-rupee-sign"></i>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="donorName"
                  name="donorName"
                  placeholder="Full Name"
                  value={form.donorName}
                  onChange={handleChange}
                  required
                />
                <i className="fas fa-user"></i>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="donorEmail"
                  name="donorEmail"
                  placeholder="Email Address"
                  value={form.donorEmail}
                  onChange={handleChange}
                  required
                />
                <i className="fas fa-envelope"></i>
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  id="donorPhone"
                  name="donorPhone"
                  placeholder="Phone Number"
                  value={form.donorPhone}
                  onChange={handleChange}
                  required
                />
                <i className="fas fa-phone"></i>
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-heart"></i> Donate Now
                  </>
                )}
              </button>
            </form>
            <p className="donation-note">
              <i className="fas fa-shield-alt"></i>
              All donations are secure and tax-deductible under 80G
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donate;