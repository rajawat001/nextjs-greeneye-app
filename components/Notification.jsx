import React, { useEffect, useState } from "react";

/**
 * Notification system for success/error/info
 */
let showNotificationFn;
export function showNotification(message, type = "info") {
  if (showNotificationFn) showNotificationFn({ message, type });
}

const icons = {
  success: "fa-check-circle",
  error: "fa-exclamation-triangle",
  warning: "fa-exclamation-circle",
  info: "fa-info-circle",
};

/**
 * Top-right toast notification
 */
const Notification = () => {
  const [notif, setNotif] = useState(null);

  // Allow global calls to showNotification()
  useEffect(() => {
    showNotificationFn = setNotif;
    return () => {
      showNotificationFn = null;
    };
  }, []);

  useEffect(() => {
    if (!notif) return;
    const timer = setTimeout(() => setNotif(null), 5000);
    return () => clearTimeout(timer);
  }, [notif]);

  if (!notif) return null;

  return (
    <div
      className={`notification notification-${notif.type}`}
      style={{
        position: "fixed",
        top: 100,
        right: 20,
        maxWidth: 400,
        zIndex: 10000,
      }}
    >
      <div className="notification-content">
        <i className={`fas ${icons[notif.type] || icons.info}`}></i>
        <span>{notif.message}</span>
        <button
          className="notification-close"
          onClick={() => setNotif(null)}
          aria-label="Close"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default Notification;