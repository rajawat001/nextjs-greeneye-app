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
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/stats`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
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

  const { today, last30Days, last1Year, totalOrders, userCount, plantCount, donationStats } = stats;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 32, marginBottom: 32 }}>
        <StatCard title="Today's Orders" value={today?.orders || 0} amount={today?.totalOrderAmount || 0} />
        <StatCard title="Monthly Orders" value={last30Days?.orders || 0} amount={last30Days?.totalOrderAmount || 0} />
        <StatCard title="Yearly Orders" value={last1Year?.orders || 0} amount={last1Year?.totalOrderAmount || 0} />
        <StatCard title="Total Orders" value={totalOrders || 0} />
        <StatCard title="Total Users" value={userCount || 0} />
        <StatCard title="Total Plants" value={plantCount || 0} />
        
        {/* ✅ Donation Stats Section */}
        <StatCard title="Today's Donations" value={today?.donations || 0} amount={today?.donationAmount || 0} />
        <StatCard title="Monthly Donations" value={last30Days?.donations || 0} amount={last30Days?.donationAmount || 0} />
        <StatCard title="Total Donations" value={last1Year?.donations || 0} amount={last1Year?.donationAmount || 0} />
      </div>
    </div>
  );
}

function StatCard({ title, value, amount }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: 24,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.11)",
        minWidth: 200,
        marginBottom: 24,
      }}
    >
      <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 32, fontWeight: 700 }}>{value}</div>
      {amount !== undefined && (
        <div style={{ color: "#0366d6", fontWeight: 500 }}>₹{amount.toLocaleString()}</div>
      )}
    </div>
  );
}

export default AdminDashboard;
