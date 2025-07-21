import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

const OrderDetails = () => {
  const router = useRouter();
  const { orderId } = router.query;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return; // Wait for router to be ready

    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
      return;
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [orderId]);

  if (loading) {
    return (
      <div className="container" style={{ maxWidth: 600, marginTop: 40 }}>
        <div style={{ textAlign: "center", padding: "2rem 0" }}>
          <i className="fas fa-spinner fa-spin"></i> Loading order details...
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container" style={{ maxWidth: 600, marginTop: 40 }}>
        <div style={{ color: "#b62222" }}>Order not found.</div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: 600, marginTop: 40 }}>
      <Link href="/myorders" passHref legacyBehavior>
        <a style={{ color: "#388e3c", textDecoration: "none", marginTop: 20, marginBottom: 18, display: "inline-block" }}>
          <i className="fas fa-arrow-left"></i> Back to Orders
        </a>
      </Link>

      <div className="auth-card" style={{ padding: 32 }}>
        <h2 style={{ marginBottom: 10 }}>
          Order #{order._id.slice(-6).toUpperCase()}
        </h2>
        <div style={{ color: "#888", fontSize: 14, marginBottom: 16 }}>
          Placed: {new Date(order.createdAt).toLocaleString()}
        </div>
        <div>
          <b>Status: </b>
          <span
            style={{
              color: order.isDelivered ? "#388e3c" : "#b62222",
              fontWeight: 600,
            }}
          >
            {order.isDelivered ? "Delivered" : "Pending"}
          </span>
        </div>

        <div style={{ margin: "18px 0" }}>
          <b>Shipping Address:</b>
          <div>{order.shippingAddress?.name}</div>
          <div>{order.shippingAddress?.address}</div>
          <div>
            {order.shippingAddress?.city}, {order.shippingAddress?.state}{" "}
            {order.shippingAddress?.pincode}
          </div>
          <div>Phone: {order.shippingAddress?.phone}</div>
        </div>

        <div>
          <b>Items:</b>
          <ul style={{ marginTop: 8 }}>
            {order.orderItems.map((item) => (
              <li key={item._id} style={{ marginBottom: 5 }}>
                {item.name || "Product"} x {item.quantity}{" "}
                <span style={{ color: "#388e3c" }}>
                  ₹{item.price * item.quantity}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: 18, fontWeight: 600 }}>
          Total: ₹
          {order.orderItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          )}
        </div>
        <div style={{ marginTop: 8 }}>
          Payment: <b>{order.paymentMethod}</b>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
