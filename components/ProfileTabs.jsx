'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function ProfileTabs() {
  const pathname = usePathname()

  const tabStyle = (active) => ({
    padding: "12px 28px 10px 0",
    fontWeight: 600,
    textDecoration: "none",
    color: active ? "#388e3c" : "#222",
    borderBottom: active ? "3px solid #388e3c" : "3px solid transparent",
    position: "sticky",
    top: "64px",
  })

  return (
    <div style={{ display: "flex", borderBottom: "1px solid #eee", marginTop: 5, marginBottom: 10 }}>
      <Link href="/profile" className="profile-tab" style={tabStyle(pathname === "/profile")}>
        Profile
      </Link>
      <Link href="/myorders" className="profile-tab" style={tabStyle(pathname.startsWith("/myorders"))}>
        My Orders
      </Link>
      <Link href="/mydonation" className="profile-tab" style={tabStyle(pathname.startsWith("/mydonation"))}>
        My Donation
      </Link>
    </div>
  )
}
