'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function MyOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      router.push('/login')
      return
    }
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/myorders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [router])

  if (loading) {
    return (
      <div className="container" style={{ maxWidth: 600, marginTop: 40 }}>
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <i className="fas fa-spinner fa-spin"></i> Loading orders...
        </div>
      </div>
    )
  }

  if (!orders.length) {
    return (
      <div className="container" style={{ maxWidth: 600, marginTop: 60 }}>
        <div style={{ color: '#888' }}>No orders found.</div>
      </div>
    )
  }

  return (
    <div className="container" style={{ maxWidth: 600, marginTop: 40 }}>
      <Link href="/profile" passHref legacyBehavior>
        <a style={{ color: "#388e3c", textDecoration: "none",marginTop:10, marginBottom: 18, display: "inline-block" }}>
          <i className="fas fa-arrow-left"></i> Back to My Profile
        </a>
      </Link>
      <h2 style={{ marginTop: 5, marginBottom: 20 }}>
        <i className="fas fa-box"></i> My Orders
      </h2>
      {orders.map((order) => (
        <Link
          key={order._id}
          href={`orderdetails/${order._id}`}
          style={{
            display: 'block',
            border: '1px solid #e0e0e0',
            borderRadius: 8,
            padding: '18px 18px 12px 18px',
            marginBottom: 18,
            textDecoration: 'none',
            color: '#222',
            background: '#fff',
            transition: 'box-shadow 0.2s',
            boxShadow: '0 2px 10px #f3f3f3',
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 16 }}>
            Order #{order._id.slice(-6).toUpperCase()}
          </div>
          <div style={{ fontSize: 13, color: '#666' }}>
            Placed: {new Date(order.createdAt).toLocaleString()}
          </div>
          <div style={{ fontSize: 13, color: '#888', margin: '6px 0' }}>
            Items: {order.orderItems.length}
          </div>
          <div>
            <span style={{ fontWeight: 500 }}>Status:</span>{' '}
            <span
              style={{
                color: order.isDelivered ? '#388e3c' : '#b62222',
                fontWeight: 600,
              }}
            >
              {order.isDelivered ? 'Delivered' : 'Pending'}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}