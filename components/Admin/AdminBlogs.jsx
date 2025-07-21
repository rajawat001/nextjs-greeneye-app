import React, { useEffect, useState } from "react";
import axios from "axios";

const initialForm = { title: "", content: "", image: "", published: true, author: "" };

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editBlogId, setEditBlogId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs`);
    setBlogs(res.data);
    setLoading(false);
  };

  // Open modal in edit or add mode
  const openBlogModal = (blog) => {
    if (blog) {
      setEditBlogId(blog._id);
      setForm({ ...blog });
    } else {
      setEditBlogId(null);
      setForm(initialForm);
    }
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const token = localStorage.getItem("authToken");
    try {
      if (editBlogId) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${editBlogId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setModalOpen(false);
      setForm(initialForm);
      setEditBlogId(null);
      fetchBlogs();
    } catch (e) {
      alert("Failed to save blog");
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this blog?")) return;
    const token = localStorage.getItem("authToken");
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${editBlogId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setModalOpen(false);
    setForm(initialForm);
    setEditBlogId(null);
    fetchBlogs();
  };

  return (
    <div>
      <h2>Blogs</h2>
      <button
        className="admin-save-btn"
        style={{ marginTop: 10, marginBottom: 18 }}
        onClick={() => openBlogModal(null)}
      >
        Add Blog
      </button>

      {/* Modal/Block for Add/Edit */}
      {modalOpen && (
        <div
          className="admin-modal-overlay"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            zIndex: 1000,
            left: 0,
            top: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.15)"
          }}
        >
          <div
            className="admin-modal"
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 10,
              boxShadow: "0 6px 24px rgba(0,0,0,0.1)",
              maxWidth: 520,
              width: "95%",
              position: "relative"
            }}
          >
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: "absolute",
                top: 14,
                right: 18,
                background: "none",
                border: "none",
                fontSize: 22,
                cursor: "pointer",
              }}
              title="Close"
            >
              ×
            </button>
            <h4 style={{ marginBottom: 12 }}>{editBlogId ? "Edit Blog" : "Add Blog"}</h4>
            <label>Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              style={{ width: "100%", marginBottom: 8 }}
            />
            <label>Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={6}
              style={{ width: "100%", marginBottom: 8 }}
            />
            <label>Image URL</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              style={{ width: "100%", marginBottom: 8 }}
            />
            <label>
              <input
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={handleChange}
              />
              Published
            </label>
            <label style={{ display: "block", marginTop: 8 }}>Author</label>
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              style={{ width: "100%", marginBottom: 8 }}
            />
            <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{ minWidth: 80 }}
              >
                {saving ? "Saving..." : editBlogId ? "Update" : "Create"}
              </button>
              {editBlogId && (
                <button
                  onClick={handleDelete}
                  style={{
                    background: "#fa5252",
                    color: "#fff",
                    border: "none",
                    minWidth: 80,
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Published</th>
              <th>Date</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr
                key={b._id}
                style={{ cursor: "pointer" }}
                onClick={() => openBlogModal(b)}
                tabIndex={0}
                title="Click to edit"
              >
                <td>{b.title}</td>
                <td>{b.published ? "Yes" : "No"}</td>
                <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                <td>{b.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}