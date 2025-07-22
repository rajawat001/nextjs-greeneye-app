'use client';

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const cities = ["Jaipur", "Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata", "Other"];
const availabilities = [
  { value: "weekends", label: "Weekends Only" },
  { value: "weekdays", label: "Weekdays" },
  { value: "flexible", label: "Flexible" },
  { value: "events", label: "Events Only" },
];
const sectors = [
  "Information Technology (IT)", "Banking & Finance", "Healthcare & Medical", "Education & Training", "Government & Public Sector", "Non-Profit / NGO", "Agriculture", "Retail & E-commerce", "Construction & Real Estate", "Legal & Law", "Arts & Media", "Travel & Hospitality", "Transportation & Logistics", "Manufacturing", "Telecommunications", "Research & Development", "Energy & Utilities", "Environment & Sustainability", "Defense & Security", "Automotive", "Entertainment & Film", "Sports & Fitness", "Marketing & Advertising", "Human Resources (HR)", "Aerospace & Aviation", "Fashion & Apparel", "Food & Beverages", "Social Work", "Freelance/Consulting", "Other"
];
const professions = [
  "Business Owner / Entrepreneur", "Private Job", "Government Employee", "Freelancer", "Student", "Homemaker", "Retired", "Unemployed", "Teacher / Professor", "Doctor / Nurse", "Engineer", "Lawyer", "Artist / Designer", "Social Worker", "Volunteer (Full-time)", "Technician / Skilled Worker", "Manager / Executive", "Sales / Marketing Professional", "IT Professional", "Content Creator / Influencer", "Finance Professional (CA, Accountant, Banker)", "Researcher / Scientist", "Consultant", "Admin / Clerical", "Self-Employed", "Other"
];

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [volEditData, setVolEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
      return;
    }
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setUser(res.data);
        setEditData({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone || "",
          address: {
            street: res.data.address?.street || "",
            city: res.data.address?.city || "",
            state: res.data.address?.state || "",
            pincode: res.data.address?.pincode || "",
          },
        });
        setVolEditData({
          city: res.data.volunteer?.city || "",
          availability: res.data.volunteer?.availability || "",
          sector: res.data.volunteer?.sector || "",
          profession: res.data.volunteer?.profession || "",
          why_do_you_want_to_join_us: res.data.volunteer?.why_do_you_want_to_join_us || "",
        });
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("authToken");
        router.push("/login");
      });
  }, [router]);

  const handleChange = (e) => setEditData({ ...editData, [e.target.name]: e.target.value });

  const handleAddressChange = (e) => {
    setEditData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleVolChange = (e) => setVolEditData({ ...volEditData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("authToken");
      const profileRes = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/profile`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      let updatedUser = profileRes.data;

      if (user.is_volunteer) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/volunteer`,
          volEditData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const { data: refreshed } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        updatedUser = refreshed;
        setVolEditData({
          city: refreshed.volunteer?.city || "",
          availability: refreshed.volunteer?.availability || "",
          sector: refreshed.volunteer?.sector || "",
          profession: refreshed.volunteer?.profession || "",
          why_do_you_want_to_join_us: refreshed.volunteer?.why_do_you_want_to_join_us || "",
        });
      }

      setUser(updatedUser);
      setEditMode(false);
    } catch (e) {
      alert(e.response?.data?.message || "Could not update profile. Try again.");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: "3rem 0" }}>
        <div className="auth-card">
          <div className="text-center">
            <i className="fas fa-spinner fa-spin fa-2x"></i>
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="profile-page">
      <div className="container" style={{ maxWidth: 600, marginTop: 40 }}>
        {/* Tabs */}
        {/* ...Tab Links Here... */}

        <div className="auth-card" style={{ minHeight: 350 }}>
          <div className="auth-header">
            <h2><i className="fas fa-user-circle"></i> Profile</h2>
            <p>Welcome, <b>{user.name}</b></p>
          </div>
          <div style={{ margin: "2rem 0" }}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={editMode ? editData.name : user.name} disabled={!editMode} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={editMode ? editData.email : user.email} disabled={!editMode} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="text" name="phone" value={user.phone || ""} disabled style={{ background: "#f7f7f7" }} />
            </div>

            {/* Address Fields */}
            <div className="form-group">
              <label>Street</label>
              <input type="text" name="street" value={editMode ? editData.address?.street : user.address?.street || ""} disabled={!editMode} onChange={handleAddressChange} />
            </div>
            <div className="form-group">
              <label>City</label>
              <input type="text" name="city" value={editMode ? editData.address?.city : user.address?.city || ""} disabled={!editMode} onChange={handleAddressChange} />
            </div>
            <div className="form-group">
              <label>State</label>
              <input type="text" name="state" value={editMode ? editData.address?.state : user.address?.state || ""} disabled={!editMode} onChange={handleAddressChange} />
            </div>
            <div className="form-group">
              <label>Pincode</label>
              <input type="text" name="pincode" value={editMode ? editData.address?.pincode : user.address?.pincode || ""} disabled={!editMode} onChange={handleAddressChange} />
            </div>

            {/* Volunteer Section */}
            {user.is_volunteer && (
              <div style={{ marginTop: 24, background: "#f8f9fc", border: "1px solid #e0e7ef", borderRadius: 8, padding: "18px 18px 8px 18px" }}>
                <div style={{ fontWeight: 600, color: "#1976d2", marginBottom: 10 }}>Volunteer Details</div>
                <div className="form-group">
                  <label>City</label>
                  <select name="city" value={editMode ? volEditData.city : user.volunteer?.city || ""} disabled={!editMode} onChange={handleVolChange}>
                    <option value="">Select Your City</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Availability</label>
                  <select name="availability" value={editMode ? volEditData.availability : user.volunteer?.availability || ""} disabled={!editMode} onChange={handleVolChange}>
                    <option value="">Select</option>
                    {availabilities.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Sector</label>
                  <select name="sector" value={editMode ? volEditData.sector : user.volunteer?.sector || ""} disabled={!editMode} onChange={handleVolChange}>
                    <option value="">Select</option>
                    {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Profession</label>
                  <select name="profession" value={editMode ? volEditData.profession : user.volunteer?.profession || ""} disabled={!editMode} onChange={handleVolChange}>
                    <option value="">Select</option>
                    {professions.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Motivation</label>
                  <textarea name="why_do_you_want_to_join_us" rows={3} value={editMode ? volEditData.why_do_you_want_to_join_us : user.volunteer?.why_do_you_want_to_join_us || ""} disabled={!editMode} onChange={handleVolChange} />
                </div>
              </div>
            )}

            {/* Edit/Save Buttons */}
            {!editMode ? (
              <button style={{ marginTop: 18, background: "#388e3c", color: "#fff", border: 0, borderRadius: 5, padding: "10px 24px", fontWeight: 600, cursor: "pointer" }} onClick={() => setEditMode(true)}>Edit Info</button>
            ) : (
              <div style={{ marginTop: 18 }}>
                <button style={{ background: "#388e3c", color: "#fff", border: 0, borderRadius: 5, padding: "10px 24px", fontWeight: 600, cursor: "pointer", marginRight: 10 }} onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save"}</button>
                <button style={{ background: "#bbb", color: "#fff", border: 0, borderRadius: 5, padding: "10px 18px", fontWeight: 500, cursor: "pointer" }} onClick={() => setEditMode(false)}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
