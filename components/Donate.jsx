// src/components/Donate.jsx

import React, { useState } from "react";
import { showNotification } from "./Notification";

/**
 * Donate section with sample breakdown and donation form.
 */
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

  // Handle preset button click
  const handleAmountBtn = (amt, idx) => {
    setAmount(amt.toString());
    setActiveBtn(idx);
  };

  // Handle custom amount input
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setActiveBtn(null);
  };

  // Handle donor info change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || parseInt(amount, 10) < 50) {
      showNotification("Please enter a minimum donation amount of ₹50.", "error");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      showNotification(`Thank you for your generous donation of ₹${amount}!`, "success");
      setAmount("");
      setForm({ donorName: "", donorEmail: "", donorPhone: "" });
      setActiveBtn(null);
      setLoading(false);
    }, 3000);
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