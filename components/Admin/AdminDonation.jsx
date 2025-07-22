import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDonation = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [donor, setDonor] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");

  const fetchDonations = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("authToken");

      // Create query params string
      const params = new URLSearchParams();
      if (donor) params.append("donor", donor);
      if (minAmount) params.append("minAmount", minAmount);
      if (sortBy) params.append("sortBy", sortBy);

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/donations?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setDonations(data.donations || []);
    } catch (err) {
      setError("Failed to fetch donations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchDonations();
  };

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>All Donations</h2>

      {/* Filter Form */}
      <form onSubmit={handleFilter} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Donor Name"
          value={donor}
          onChange={(e) => setDonor(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <input
          type="number"
          placeholder="Min Amount"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ marginRight: 10 }}
        >
          <option value="createdAt">Newest</option>
          <option value="amount">Amount</option>
          <option value="donorName">Donor Name</option>
        </select>
        <button type="submit">Apply Filters</button>
      </form>

      {loading ? (
        <div>Loading donations...</div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Donor</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Amount</th>
                <th>Paid</th>
                <th>Date</th>
                <th>Payment ID</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={donation._id}>
                  <td>{index + 1}</td>
                  <td>{donation.donorName}</td>
                  <td>{donation.donorEmail}</td>
                  <td>{donation.donorPhone}</td>
                  <td>₹{donation.amount}</td>
                  <td style={{ color: donation.isPaid ? "green" : "red" }}>
                    {donation.isPaid ? "Yes" : "No"}
                  </td>
                  <td>{new Date(donation.createdAt).toLocaleString()}</td>
                  <td>{donation.paymentInfo?.razorpay_payment_id || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDonation;
