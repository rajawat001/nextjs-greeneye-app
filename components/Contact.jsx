import React, { useState } from "react";
import { showNotification } from "./Notification";
import { useTranslations } from "next-intl";

const Contact = () => {
  const t = useTranslations("contact");

  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      showNotification(t("successMessage", { defaultMessage: "Your message has been sent successfully! We will get back to you soon." }), "success");
    }, 2000);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-content">
          {/* Contact Info */}
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
              <div className="contact-details">
                <h4>{t("locationTitle")}</h4>
                <p>
                  Prime, C11, Kanak Vrindavan<br />
                  Jaipur, Rajasthan, Bajiri Mandi-302034<br />
                  {t("country", { defaultMessage: "India" })}
                </p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-phone"></i></div>
              <div className="contact-details">
                <h4>{t("phoneTitle")}</h4>
                <p>7023277322</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-envelope"></i></div>
              <div className="contact-details">
                <h4>{t("emailTitle")}</h4>
                <p>contact@greeneye.foundation</p>
              </div>
            </div>
            <div className="social-links">
              <h4>{t("followUs")}</h4>
              <div className="social-icons">
                <a href="https://facebook.com/" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="https://twitter.com/" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://instagram.com/" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://linkedin.com/" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://youtube.com/" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <div className="contact-form-container">
            <h3>{t("formTitle")}</h3>
            <form className="contact-form" id="contactForm" onSubmit={handleSubmit} autoComplete="off">
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    id="contactName"
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
                    id="lastName"
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
                  id="contactEmail"
                  name="email"
                  placeholder={t("emailAddress")}
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <i className="fas fa-envelope"></i>
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  id="contactPhone"
                  name="phone"
                  placeholder={t("phoneNumber")}
                  value={form.phone}
                  onChange={handleChange}
                />
                <i className="fas fa-phone"></i>
              </div>
              <div className="form-group">
                <select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">{t("selectSubject")}</option>
                  <option value="volunteer">{t("subjectVolunteer")}</option>
                  <option value="donation">{t("subjectDonation")}</option>
                  <option value="partnership">{t("subjectPartnership")}</option>
                  <option value="general">{t("subjectGeneral")}</option>
                  <option value="feedback">{t("subjectFeedback")}</option>
                </select>
                <i className="fas fa-tag"></i>
              </div>
              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  placeholder={t("yourMessage")}
                  rows="6"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
                <i className="fas fa-comment"></i>
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> {t("sending")}
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> {t("sendMessage")}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;