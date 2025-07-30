import { useRouter } from 'next/router';

const LANG_LABELS = {
  en: "English",
  fr: "Français",
  es: "Español",
  ar: "العربية",
  zh: "中文",
  ja: "日本語"
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale, locales, asPath } = router;

  if (!locales || locales.length === 0) return null; // prevent error

  return (
  <select
    value={locale}
    onChange={e => router.push(asPath, asPath, { locale: e.target.value })}
    style={{
    padding: '1px 3px',              // Smaller padding
    borderRadius: '2px',             // Rounded corners
    fontSize: '14px',                // Slightly smaller text
    marginLeft: '2px',
    background: '#f1f5f9',           // Soft grayish background (Tailwind slate-100)
    border: '1px solid #2a5994ff',     // Subtle border (Tailwind slate-300)
    color: '#111827',                // Dark text
    zIndex: 9999,
  }}
  >
    {locales.map(l => (
      <option key={l} value={l}>
        {LANG_LABELS[l] || l.toUpperCase()}
      </option>
    ))}
  </select>
);
}
