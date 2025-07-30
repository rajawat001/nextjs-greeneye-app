//'use client';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

let showNotificationFn;
export function showNotification(message, type = 'info') {
  if (showNotificationFn) showNotificationFn({ message, type });
}

const icons = {
  success: 'fa-check-circle',
  error: 'fa-exclamation-triangle',
  warning: 'fa-exclamation-circle',
  info: 'fa-info-circle',
};

const Notification = () => {
  const t = useTranslations('notification');
  const [notif, setNotif] = useState(null);

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

  let message = notif.message;
  if (typeof message === 'string' && message.startsWith('notif:')) {
    message = t(message.replace('notif:', ''));
  }

  return (
    <div
      className={`notification notification-${notif.type}`}
      style={{
        position: 'fixed',
        top: 100,
        right: 20,
        maxWidth: 400,
        zIndex: 10000,
      }}
    >
      <div className="notification-content">
        <i className={`fas ${icons[notif.type] || icons.info}`}></i>
        <span>{message}</span>
        <button
          className="notification-close"
          onClick={() => setNotif(null)}
          aria-label={t('close')}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default Notification;