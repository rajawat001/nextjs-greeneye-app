import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(data.data);
      } catch (err) {
        setError("Failed to load stats. Are you logged in as admin?");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!stats) return <div>No data available.</div>;

  const today = stats.today || { orders: 0, totalAmount: 0 };
  const last30Days = stats.last30Days || { orders: 0, totalAmount: 0 };
  const last1Year = stats.last1Year || { orders: 0, totalAmount: 0 };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div style={{ display: "flex", gap: 32, marginBottom: 32, flexWrap: "wrap" }}>
        <StatCard title="Today's Orders" value={today.orders} amount={today.totalAmount} />
        <StatCard title="Monthly Orders" value={last30Days.orders} amount={last30Days.totalAmount} />
        <StatCard title="Yearly Orders" value={last1Year.orders} amount={last1Year.totalAmount} />
        <StatCard title="Total Orders" value={stats.totalOrders} />
        <StatCard title="Total Users" value={stats.userCount} />
        <StatCard title="Total Plants" value={stats.plantCount} />
      </div>
    </div>
  );
}

function StatCard({ title, value, amount }) {
  return (
    <div style={{
      background: "#fff", padding: 24, borderRadius: 8,
      boxShadow: "0 2px 8px rgba(0,0,0,0.11)", minWidth: 200,
      marginBottom: 24
    }}>
      <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 32, fontWeight: 700 }}>{value}</div>
      {amount !== undefined && (
        <div style={{ color: "#0366d6", fontWeight: 500 }}>₹{amount.toLocaleString()}</div>
      )}
    </div>
  );
}

export default AdminDashboard;
