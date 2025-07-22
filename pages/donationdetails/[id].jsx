'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import Link from "next/link"

export default function DonationDetails() {
  const router = useRouter()
  const { id } = router.query

  const [donation, setDonation] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const token = localStorage.getItem("authToken")
    if (!token) {
      router.push("/login")
      return
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/donations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDonation(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error loading donation:", err)
        setLoading(false)
      })
  }, [id, router])

  if (loading) {
    return <div style={{ padding: 40, textAlign: "center" }}>Loading donation...</div>
  }

  if (!donation) {
    return <div style={{ padding: 40, color: "red" }}>Donation not found.</div>
  }

  return (
    <div className="container" style={{ maxWidth: 600, marginTop: 40 }}>
      <Link href="/mydonation" passHref legacyBehavior>
        <a style={{ color: "#388e3c", textDecoration: "none",marginTop:10, marginBottom: 18, display: "inline-block" }}>
          <i className="fas fa-arrow-left"></i> Back to Donations
        </a>
      </Link>

      <div className="auth-card" style={{ padding: 32 }}>
        <h2 style={{ marginBottom: 10 }}>Donation #{donation._id.slice(-6).toUpperCase()}</h2>
        <div style={{ color: "#888", fontSize: 14, marginBottom: 16 }}>
          Date: {new Date(donation.createdAt).toLocaleString()}
        </div>
        <div style={{ marginBottom: 10 }}>
          <b>Amount:</b> ₹{donation.amount }
        </div>
        <div style={{ marginBottom: 10 }}>
          <b>Status:</b>{" "}
          <span style={{ color: donation.isPaid ? "#388e3c" : "#b62222", fontWeight: 600 }}>
            {donation.isPaid ? "Paid" : "Pending"}
          </span>
        </div>
        <div style={{ marginBottom: 10 }}>
          <b>Name:</b> {donation.donorName}
        </div>
        <div style={{ marginBottom: 10 }}>
          <b>Email:</b> {donation.donorEmail}
        </div>
        <div>
          <b>Phone:</b> {donation.donorPhone}
        </div>
      </div>
    </div>
  )
}
