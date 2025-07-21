import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProduct() {
  const [plants, setPlants] = useState([]);
  const [selected, setSelected] = useState(null);
  const [edit, setEdit] = useState({});
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  useEffect(() => {
    fetchPlants();
    // eslint-disable-next-line
  }, []);

  const fetchPlants = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/plants`);
      setPlants(data.plants);
    } catch (e) {
      setPlants([]);
    }
    setLoading(false);
  };

  const openEdit = (plant) => {
    setIsNew(false);
    setSelected(plant);
    setEdit({
      name: plant.name || "",
      description: plant.description || "",
      price: plant.price || "",
      image: plant.image || "",
      category: plant.category || "",
      countInStock: plant.countInStock || 0,
      isFeatured: !!plant.isFeatured,
    });
    setSaveMsg("");
  };

  const openNew = () => {
    setIsNew(true);
    setSelected(null);
    setEdit({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
      countInStock: "",
      isFeatured: false,
    });
    setSaveMsg("");
  };

  const closeModal = () => {
    setSelected(null);
    setIsNew(false);
    setEdit({});
    setSaveMsg("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setEdit({ ...edit, [name]: checked });
    } else {
      setEdit({ ...edit, [name]: value });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg("");
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (isNew) {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/plants`,
          edit,
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        setPlants((arr) => [data, ...arr]);
        setSaveMsg("Product created!");
        closeModal();
      } else {
        const { data } = await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/plants/${selected._id}`,
          edit,
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        setPlants((arr) =>
          arr.map((p) => (p._id === data._id ? { ...p, ...data } : p))
        );
        setSaveMsg("Product updated!");
        setSelected({ ...selected, ...data });
        closeModal();
      }
    } catch (e) {
      setSaveMsg("Failed to save.");
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this product?")) return;
    setSaving(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/plants/${selected._id}`,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      setPlants((arr) => arr.filter((p) => p._id !== selected._id));
      closeModal();
    } catch (e) {
      setSaveMsg("Failed to delete.");
    }
    setSaving(false);
  };

  return (
    <div>
      <h2 style={{marginBottom: "1.5rem"}}>Products</h2>
      <button
        className="admin-save-btn"
        style={{marginBottom: 18}}
        onClick={openNew}
      >
        + New Product
      </button>
      {loading ? (
        <div className="admin-loading">Loading...</div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Featured</th>
            </tr>
          </thead>
          <tbody>
            {plants.map((plant) => (
              <tr
                key={plant._id}
                style={{ cursor: "pointer" }}
                onClick={() => openEdit(plant)}
              >
                <td>{plant.name}</td>
                <td>{plant.price}</td>
                <td>{plant.countInStock}</td>
                <td>{plant.category}</td>
                <td>
                  {plant.isFeatured
                    ? <span style={{color:"#388e3c",fontWeight:600}}>Yes</span>
                    : <span style={{color:"#b62222",fontWeight:600}}>No</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for edit or add */}
      {(selected || isNew) && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <button className="admin-modal-close" onClick={closeModal}>&times;</button>
            <h3 style={{fontWeight:600,marginBottom:16}}>{isNew ? "Add New Product" : "Edit Product"}</h3>
            <div style={{marginBottom:18}}>
              <label>Image URL</label>
              <input
                name="image"
                value={edit.image}
                onChange={handleChange}
                className="admin-input"
                style={{ width: "100%" }}
                placeholder="e.g. aloe-vera.jpg"
              />
              {edit.image && (
                <img
                  src={edit.image}
                  alt="product"
                  style={{width: "60px", height: "60px", objectFit: "cover", margin: "10px 0", borderRadius: 8, border: "1px solid #eee"}}
                  onError={e => (e.target.style.display='none')}
                />
              )}
              <label>Name</label>
              <input
                name="name"
                value={edit.name}
                onChange={handleChange}
                className="admin-input"
                style={{ width: "100%" }}
              />
              <label>Description</label>
              <textarea
                name="description"
                value={edit.description}
                onChange={handleChange}
                className="admin-input"
                style={{ width: "100%", minHeight: 60, marginBottom: 10 }}
              />
              <label>Price (₹)</label>
              <input
                name="price"
                type="number"
                value={edit.price}
                onChange={handleChange}
                className="admin-input"
                style={{ width: "100%" }}
              />
              <label>Stock</label>
              <input
                name="countInStock"
                type="number"
                value={edit.countInStock}
                onChange={handleChange}
                className="admin-input"
                style={{ width: "100%" }}
              />
              <label>Category</label>
              <select
                name="category"
                value={edit.category}
                onChange={handleChange}
                className="admin-input"
                style={{ width: "100%" }}
              >
                <option value="">Select Category</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Tree">Tree</option>
              </select>
              <label style={{marginTop:10}}>
                <input
                  name="isFeatured"
                  type="checkbox"
                  checked={edit.isFeatured}
                  onChange={handleChange}
                  style={{marginRight: 8}}
                />
                Featured
              </label>
            </div>
            <button className="admin-save-btn" disabled={saving} onClick={handleSave}>
              {saving ? "Saving..." : isNew ? "Add Product" : "Save"}
            </button>
            {!isNew && (
              <button
                className="admin-save-btn delete"
                style={{marginLeft: 10}}
                disabled={saving}
                onClick={handleDelete}
              >
                {saving ? "Deleting..." : "Delete"}
              </button>
            )}
            <div style={{minHeight:28, marginTop:8, color:saveMsg.includes("Failed") ? "#b62222" : "#388e3c", fontWeight:500}}>
              {saveMsg}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}