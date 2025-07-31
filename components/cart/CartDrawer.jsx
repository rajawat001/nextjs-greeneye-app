// components/cart/CartDrawer.jsx
import React from "react";
import { useRouter } from "next/router";

export default function CartDrawer({
  open,
  onClose,
  cart,
  changeQty,
  removeFromCart,
  total,
  t = (k) => k, // optional i18n
}) {
  const router = useRouter();
  if (!open) return null;

  const formatPrice = (p) => `₹${Number(p).toLocaleString()}`;

  return (
    <div
      style={{
        position: "fixed",
        top: 40,
        right: 0,
        width: 340,
        height: "100vh",
        background: "#fff",
        borderLeft: "2px solid #b6ccb9",
        boxShadow: "-3px 0 15px rgba(56,142,60,0.09)",
        zIndex: 30,
        overflowY: "auto",
        padding: "28px 22px 12px 22px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 50,
          right: 12,
          background: "none",
          border: "none",
          fontSize: 21,
          color: "#388e3c",
          cursor: "pointer",
        }}
        title={t("close")}
      >
        ×
      </button>
      <h3 style={{ marginTop: 20, marginBottom: 18 }}>
        <i className="fas fa-shopping-cart"></i> {t("yourCart") || "Your Cart"}
      </h3>

      {!cart.items || cart.items.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <i className="fas fa-seedling" style={{ fontSize: 38, color: "#b6ccb9" }}></i>
          <p style={{ color: "#888" }}>{t("cartEmpty") || "Cart is empty"}</p>
        </div>
      ) : (
        <div>
          {cart.items.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 12,
                borderBottom: "1px solid #eee",
                paddingBottom: 8,
              }}
            >
              <div style={{ flex: 1 }}>
                <b>{item.plant?.name}</b>
                <div style={{ fontSize: 13, color: "#388e3c" }}>
                  {formatPrice(item.plant?.price)} x {item.quantity}
                  <span style={{ fontWeight: 600, marginLeft: 8 }}>
                    = {formatPrice((item.plant?.price || 0) * item.quantity)}
                  </span>
                </div>
              </div>
              <div>
                <button
                  onClick={() => changeQty(item._id, item.quantity - 1)}
                  style={{
                    background: "#eee",
                    border: "none",
                    borderRadius: 3,
                    width: 25,
                    height: 25,
                    fontSize: 18,
                    marginRight: 3,
                    cursor: "pointer",
                  }}
                >
                  -
                </button>
                <button
                  onClick={() => changeQty(item._id, item.quantity + 1)}
                  style={{
                    background: "#eee",
                    border: "none",
                    borderRadius: 3,
                    width: 25,
                    height: 25,
                    fontSize: 18,
                    marginRight: 8,
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item._id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#b62222",
                    fontSize: 17,
                    cursor: "pointer",
                  }}
                  title={t("removeFromCart")}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}

          <div style={{ borderTop: "1px solid #b6ccb9", margin: "18px 0" }}></div>
          <div style={{ textAlign: "right", fontWeight: 600, fontSize: 17, color: "#388e3c" }}>
            {t("total") || "Total"}: {formatPrice(total)}
          </div>
          <button
            onClick={() => {
              onClose();
              router.push("/checkout");
            }}
            style={{
              background: "#388e3c",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "10px 28px",
              fontWeight: 600,
              fontSize: 16,
              marginTop: 22,
              cursor: "pointer",
              width: "100%",
            }}
          >
            <i className="fas fa-credit-card"></i> {t("checkout") || "Checkout"}
          </button>
        </div>
      )}
    </div>
  );
}
