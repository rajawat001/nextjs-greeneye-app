import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      setError("");
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("You must be logged in to view your cart.");
          return;
        }
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCart(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Could not fetch cart. Please try again.");
      }
    };
    fetchCart();
  }, []);

  const total =
    cart?.items.reduce((sum, item) => sum + item.plant.price * item.quantity, 0) || 0;

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { name, email, phone, address, city, state, pincode } = userInfo;
    if (!name || !email || !phone || !address || !city || !state || !pincode)
      return "Please fill all fields";
    if (!/^\d{10}$/.test(phone)) return "Enter a valid 10-digit phone number";
    if (!/\S+@\S+\.\S+/.test(email)) return "Enter a valid email";
    if (!/^\d{6}$/.test(pincode)) return "Enter a valid 6-digit pincode";
    if (!cart || !cart.items || cart.items.length === 0) return "Your cart is empty";
    return "";
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationMsg = validate();
    if (validationMsg) {
      setError(validationMsg);
      return;
    }

    setPlacing(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("You must be logged in to place an order.");
        setPlacing(false);
        return;
      }

      const orderItems = cart.items.map((item) => ({
        plant: item.plant._id,
        quantity: item.quantity,
      }));

      const shippingAddress = {
        name: userInfo.name,
        address: userInfo.address,
        city: userInfo.city,
        state: userInfo.state,
        pincode: userInfo.pincode,
        phone: userInfo.phone,
      };

      const orderData = {
        orderItems,
        shippingAddress,
        paymentMethod,
      };

      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Order placed successfully! Thank you 🌱");
      setCart(null);
      setTimeout(() => {
        router.push("/myorders");
      }, 0);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order. Try again later.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 2px 16px #e0e0e0" }}>
      <h2 style={{ marginBottom: 22 }}>Checkout</h2>
      <form onSubmit={handlePlaceOrder} autoComplete="off">
        {[
          { label: "Name", name: "name" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone", name: "phone", type: "tel", pattern: "\\d{10}", maxLength: 10 },
          { label: "Shipping Address", name: "address", isTextarea: true },
          { label: "City", name: "city" },
          { label: "State", name: "state" },
          { label: "Pincode", name: "pincode", pattern: "\\d{6}", maxLength: 6 },
        ].map((field) => (
          <div style={{ marginBottom: 16 }} key={field.name}>
            <label>{field.label}*</label>
            {field.isTextarea ? (
              <textarea
                name={field.name}
                value={userInfo[field.name]}
                onChange={handleChange}
                required
                className="form-input"
                style={{ width: "100%", padding: 8, marginTop: 4, minHeight: 60 }}
              />
            ) : (
              <input
                name={field.name}
                type={field.type || "text"}
                value={userInfo[field.name]}
                onChange={handleChange}
                required
                pattern={field.pattern}
                maxLength={field.maxLength}
                className="form-input"
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              />
            )}
          </div>
        ))}

        <div style={{ marginBottom: 20 }}>
          <label>Payment Method*</label>
          <div>
            {["COD", "Razorpay"].map((method) => (
              <label key={method} style={{ marginRight: 28 }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                />{" "}
                {method === "COD" ? "Cash on Delivery" : "Online Payment"}
              </label>
            ))}
          </div>
        </div>

        <h3>Order Summary</h3>
        {cart && cart.items?.length > 0 ? (
          <ul style={{ padding: 0, listStyle: "none", marginBottom: 8 }}>
            {cart.items.map((item) => (
              <li key={item._id} style={{ marginBottom: 4 }}>
                <span style={{ fontWeight: 500 }}>{item.plant.name}</span>
                {` x${item.quantity} `}
                <span style={{ color: "#388e3c" }}>
                  ₹{item.plant.price * item.quantity}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ color: "#b62222", marginBottom: 8 }}>No items in your cart.</div>
        )}
        <div style={{ textAlign: "right", fontWeight: 600, fontSize: 18, color: "#388e3c" }}>
          Total: ₹{total}
        </div>

        {error && <div style={{ color: "#b62222", marginTop: 12 }}>{error}</div>}
        {success && <div style={{ color: "#388e3c", marginTop: 12 }}>{success}</div>}

        <button
          type="submit"
          disabled={placing || !cart?.items?.length}
          style={{
            marginTop: 22,
            padding: "12px 36px",
            background: "#388e3c",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontWeight: 700,
            fontSize: 17,
            cursor: placing ? "not-allowed" : "pointer",
          }}
        >
          {placing ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
