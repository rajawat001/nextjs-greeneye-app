import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const formatPrice = (price) => `₹${price.toLocaleString()}`;
const getToken = () => typeof window !== "undefined" && localStorage.getItem("authToken");

const PlantShop = () => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [cart, setCart] = useState({ items: [] });
  const [showCart, setShowCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/plants`)
      .then((res) => {
        const arr = Array.isArray(res.data.plants) ? res.data.plants : [];
        setPlants(arr);
        setFilteredPlants(arr);
        if (arr.length) {
          const prices = arr.map((p) => p.price);
          setPriceRange([Math.min(...prices), Math.max(...prices)]);
        }
      })
      .catch(() => {
        setPlants([]);
        setFilteredPlants([]);
      });
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = getToken();
        if (!token) return setCart({ items: [] });
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(res.data);
      } catch {
        setCart({ items: [] });
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    setFilteredPlants(
      plants.filter((plant) => {
        const matchesName = plant.name.toLowerCase().includes(search.toLowerCase());
        const matchesPrice = plant.price >= priceRange[0] && plant.price <= priceRange[1];
        return matchesName && matchesPrice;
      })
    );
  }, [search, priceRange, plants]);

  const addToCart = async (plant) => {
    const token = getToken();
    if (!token) return alert("Please login first!");
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`,
        { plantId: plant._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (e) {
      alert(e.response?.data?.message || "Failed to add to cart. Try again.");
    }
  };

  const removeFromCart = async (plantId) => {
    const token = getToken();
    if (!token) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart/${plantId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (e) {
      alert(e.response?.data?.message || "Failed to remove from cart. Try again.");
    }
  };

  const changeQty = async (plantId, delta) => {
    const token = getToken();
    if (!token) return;
    try {
      const item = cart.items.find((i) => i._id === plantId);
      if (!item) return;
      const newQty = item.quantity + delta;
      if (newQty < 1) return;
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart/${plantId}`,
        { quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (e) {
      alert(e.response?.data?.message || "Failed to update cart. Try again.");
    }
  };

  const minPrice = Math.min(...plants.map((p) => p.price), 0);
  const maxPrice = Math.max(...plants.map((p) => p.price), 10000);
  const cartCount = cart.items?.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="container" style={{ padding: "40px 10px", maxWidth: 1200 }}>
      <h1 style={{ textAlign: "center" }}>🪴 Plant Store</h1>

      {/* Search and Filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          justifyContent: "space-between",
          alignItems: "center",
          margin: "30px 0",
        }}
      >
        <input
          type="text"
          placeholder="Search plant by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: 220,
            padding: "10px 14px",
            fontSize: 16,
            border: "1px solid #b6ccb9",
            borderRadius: 6,
          }}
        />

        <div style={{ minWidth: 250 }}>
          <label style={{ marginRight: 8 }}>Price Range:</label>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            style={{ width: 110 }}
          />
          <span style={{ marginLeft: 8, fontWeight: 600 }}>{formatPrice(priceRange[0])}</span>
          <span style={{ margin: "0 6px" }}>-</span>
          <span style={{ fontWeight: 600 }}>{formatPrice(priceRange[1])}</span>
        </div>
        <button
          className="btn btn-cart"
          style={{
            padding: "10px 18px",
            background: "#388e3c",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontWeight: 500,
            cursor: "pointer",
            fontSize: 16,
            position: "relative",
          }}
          onClick={() => setShowCart((v) => !v)}
        >
          <i className="fas fa-shopping-cart"></i> View Cart
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: 4,
                right: 8,
                background: "#fff",
                color: "#388e3c",
                borderRadius: "50%",
                padding: "3px 7px",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Plant List */}
      <div
        className="plant-list"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 30,
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        {filteredPlants.length === 0 && (
          <p style={{ fontStyle: "italic", opacity: 0.6 }}>
            No plants found for this search/price.
          </p>
        )}
        {filteredPlants.map((plant) => (
          <div
            key={plant._id}
            className="plant-card"
            style={{
              background: "#fff",
              border: "1px solid #b6ccb9",
              borderRadius: 10,
              padding: 20,
              width: 220,
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 120,
                height: 120,
                marginBottom: 16,
                background: "#f4f7f3",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {/* Show plant image if available, else fallback */}
              {plant.imageUrl ? (
                <img
                  src={plant.imageUrl}
                  alt={plant.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <i className="fas fa-seedling" style={{ fontSize: 60, color: "#b6ccb9" }}></i>
              )}
            </div>
            <h3 style={{ margin: "8px 0 4px" }}>{plant.name}</h3>
            <p style={{ fontSize: 15, color: "#388e3c", fontWeight: 600, marginBottom: 7 }}>
              {formatPrice(plant.price)}
            </p>
            <p
              style={{
                fontSize: 13,
                color: "#7a7a7a",
                marginBottom: 10,
                minHeight: 34,
                textAlign: "center",
              }}
            >
              {plant.description || "No description available."}
            </p>
            <button
              onClick={() => addToCart(plant)}
              style={{
                background: "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "8px 18px",
                fontWeight: 500,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              <i className="fas fa-cart-plus"></i> Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Modal/Panel */}
      {showCart && (
        <div
          style={{
            position: "fixed",
            top: 40,
            right: 0,
            width: "340px",
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
            onClick={() => setShowCart(false)}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "none",
              border: "none",
              fontSize: 21,
              color: "#388e3c",
              cursor: "pointer",
            }}
            title="Close"
          >
            ×
          </button>
          <h3 style={{ marginBottom: 18 }}>
            <i className="fas fa-shopping-cart"></i> Your Cart
          </h3>
          {!cart.items || cart.items.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <i className="fas fa-seedling" style={{ fontSize: 38, color: "#b6ccb9" }}></i>
              <p style={{ color: "#888" }}>Cart is empty.</p>
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
                    <b>{item.plant.name}</b>
                    <div style={{ fontSize: 13, color: "#388e3c" }}>
                      {formatPrice(item.plant.price)} x {item.quantity}
                      <span style={{ fontWeight: 600, marginLeft: 8 }}>
                        = {formatPrice(item.plant.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => changeQty(item._id, -1)}
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
                      onClick={() => changeQty(item._id, 1)}
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
                      title="Remove from cart"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid #b6ccb9", margin: "18px 0" }}></div>
              <div style={{ textAlign: "right", fontWeight: 600, fontSize: 17, color: "#388e3c" }}>
                Total:{" "}
                {formatPrice(
                  cart.items.reduce((sum, item) => sum + item.plant.price * item.quantity, 0)
                )}
              </div>
              <button
                onClick={() => {
                  setShowCart(false);
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
                <i className="fas fa-credit-card"></i> Checkout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlantShop;
