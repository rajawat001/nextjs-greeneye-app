import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Checkout = () => {
  const t = useTranslations("checkout");
  const [cart, setCart] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
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
          setError(t("loginRequired"));
          return;
        }
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCart(res.data);
      } catch (err) {
        setError(err.response?.data?.message || t("fetchCartError"));
      }
    };

    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { name, email, phone, address } = res.data;
        setUserInfo((prev) => ({
          ...prev,
          name,
          email,
          phone: phone || "",
          street: address?.street || "",
          city: address?.city || "",
          state: address?.state || "",
          pincode: address?.pincode || "",
        }));
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchCart();
    fetchUserInfo();
    // eslint-disable-next-line
  }, []);

  const total =
    cart?.items.reduce((sum, item) => sum + item.plant.price * item.quantity, 0) || 0;

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { name, email, phone, street, city, state, pincode } = userInfo;
    if (!name || !email || !phone || !street || !city || !state || !pincode)
      return t("fillAllFields");
    if (!/^\d{10}$/.test(phone)) return t("invalidPhone");
    if (!/\S+@\S+\.\S+/.test(email)) return t("invalidEmail");
    if (!/^\d{6}$/.test(pincode)) return t("invalidPincode");
    if (!cart || !cart.items || cart.items.length === 0) return t("cartEmpty");
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
        setError(t("loginRequired"));
        setPlacing(false);
        return;
      }

      const orderItems = cart.items.map((item) => ({
        plant: item.plant._id,
        quantity: item.quantity,
      }));

      const shippingAddress = {
        name: userInfo.name,
        street: userInfo.street,
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

      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const createdOrder = res.data;

      // 🚀 Razorpay Checkout if Razorpay selected
      if (paymentMethod === "Razorpay") {
        const razorpayOptions = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: createdOrder.totalPrice * 100,
          currency: "INR",
          name: "GreenEye Store",
          description: t("razorpayDesc"),
          order_id: createdOrder.paymentResult.id,
          handler: async function (response) {
            const verifyRes = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payment/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: createdOrder._id,
            }, {
              headers: { Authorization: `Bearer ${token}` }
            });

            if (verifyRes.data.success) {
              setSuccess(t("paymentSuccess"));
              setCart(null);
              router.push("/myorders");
            } else {
              setError(t("paymentVerifyFail"));
            }
          },
          prefill: {
            name: userInfo.name,
            email: userInfo.email,
            contact: userInfo.phone,
          },
          theme: { color: "#388e3c" },
        };

        const rzp = new window.Razorpay(razorpayOptions);
        rzp.open();
      } else {
        setSuccess(t("orderPlacedCOD"));
        setCart(null);
        router.push("/myorders");
      }
    } catch (err) {
      setError(err.response?.data?.message || t("placeOrderFail"));
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div style={{
      maxWidth: 600,
      margin: "50px auto",
      padding: 24,
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 16px #e0e0e0"
    }}>
    <Link
        href="/plantshop"
        style={{ color: "#388e3c", textDecoration: "none", fontWeight: 600 }}
      >
        ← Back to Plant Shop
      </Link>
      <h2 style={{ marginBottom: 22 }}>{t("checkoutTitle")}</h2>
      <form onSubmit={handlePlaceOrder} autoComplete="off">
        {[
          { label: t("name"), name: "name" },
          { label: t("email"), name: "email", type: "email" },
          { label: t("phone"), name: "phone", type: "tel", pattern: "\\d{10}", maxLength: 10 },
          { label: t("shippingAddress"), name: "street", isTextarea: true },
          { label: t("city"), name: "city" },
          { label: t("state"), name: "state" },
          { label: t("pincode"), name: "pincode", pattern: "\\d{6}", maxLength: 6 },
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
          <label>{t("paymentMethod")}*</label>
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
                {method === "COD" ? t("cod") : t("onlinePayment")}
              </label>
            ))}
          </div>
        </div>

        <h3>{t("orderSummary")}</h3>
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
          <div style={{ color: "#b62222", marginBottom: 8 }}>{t("cartNoItems")}</div>
        )}
        <div style={{ textAlign: "right", fontWeight: 600, fontSize: 18, color: "#388e3c" }}>
          {t("total")}: ₹{total}
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
          {placing ? t("placingOrder") : t("placeOrder")}
        </button>
      </form>
    </div>
  );
};

export default Checkout;