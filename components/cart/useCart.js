// components/cart/useCart.js
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";

const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

export default function useCart() {
  const [cart, setCart] = useState({ items: [] });
  const [open, setOpen] = useState(false);
  const token = getToken();

  const headers = useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : {}),
    [token]
  );

  const fetchCart = useCallback(async () => {
    if (!token) return setCart({ items: [] });
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`,
        { headers }
      );
      setCart(res.data);
    } catch {
      setCart({ items: [] });
    }
  }, [headers, token]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = useCallback(
    async (plantOrId, quantity = 1) => {
      if (!token) throw new Error("LOGIN_REQUIRED");
      const plantId = typeof plantOrId === "string" ? plantOrId : plantOrId._id;
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`,
        { plantId, quantity },
        { headers }
      );
      await fetchCart();
      setOpen(true);
    },
    [headers, token, fetchCart]
  );

  const removeFromCart = useCallback(
    async (itemId) => {
      if (!token) return;
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart/${itemId}`,
        { headers }
      );
      await fetchCart();
    },
    [headers, token, fetchCart]
  );

  const changeQty = useCallback(
    async (itemId, newQty) => {
      if (!token || newQty < 1) return;
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart/${itemId}`,
        { quantity: newQty },
        { headers }
      );
      await fetchCart();
    },
    [headers, token, fetchCart]
  );

  const cartCount = useMemo(
    () => cart.items?.reduce((s, i) => s + i.quantity, 0) || 0,
    [cart]
  );

  const total = useMemo(
    () =>
      cart.items?.reduce((s, i) => s + (i.plant?.price || 0) * i.quantity, 0) ||
      0,
    [cart]
  );

  return {
    cart,
    cartCount,
    total,
    open,
    setOpen,
    addToCart,
    removeFromCart,
    changeQty,
    refresh: fetchCart,
  };
}
