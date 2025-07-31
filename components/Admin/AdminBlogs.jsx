import React, { useEffect, useState } from "react";
import axios from "axios";

const LANGUAGES = ["en", "fr", "hi"]; // supported language codes

const initialForm = {
  slug: "",
  image: "",
  published: true,
  author: "",
  translations: {
    en: { title: "", content: "" },
    fr: { title: "", content: "" },
    hi: { title: "", content: "" },
  }
};

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editBlogId, setEditBlogId] = useState(null);
  const [selectedLang, setSelectedLang] = useState("en");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.imageUrl) {
        setForm((prev) => ({ ...prev, image: data.imageUrl }));
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed");
    }
  };


  const fetchBlogs = async () => {
    setLoading(true);
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs`);
    setBlogs(res.data.blogs);
    setLoading(false);
  };

  const openBlogModal = (blog) => {
    if (blog) {
      setEditBlogId(blog._id);
      setForm({
        slug: blog.slug,
        image: blog.image,
        published: blog.published,
        author: blog.author,
        translations: {
          ...initialForm.translations,
          ...blog.translations
        }
      });
    } else {
      setEditBlogId(null);
      setForm(initialForm);
    }
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (["title", "content"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        translations: {
          ...prev.translations,
          [selectedLang]: {
            ...prev.translations[selectedLang],
            [name]: value
          }
        }
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const token = localStorage.getItem("authToken");
    try {
      const payload = { ...form };
      if (editBlogId) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${editBlogId}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs`,
          payload,
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

      {modalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <button onClick={() => setModalOpen(false)} className="modal-close">×</button>
            <h4>{editBlogId ? "Edit Blog" : "Add Blog"}</h4>

            <label>Slug</label>
            <input name="slug" value={form.slug} onChange={handleChange} />

            <label>Upload Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />

            {form.image && (
              <div style={{ marginTop: 8 }}>
                <strong>Preview:</strong>
                <br />
                <img src={form.image} alt="Uploaded preview" style={{ maxWidth: "200px", marginTop: 5 }} />
              </div>
            )}

            <label>
              <input
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={handleChange}
              />
              Published
            </label>

            <label>Author</label>
            <input name="author" value={form.author} onChange={handleChange} />

            {/* Language Selector */}
            <label>Language</label>
            <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)}>
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>{lang.toUpperCase()}</option>
              ))}
            </select>

            {/* Title & Content based on selected language */}
            <label>Title ({selectedLang})</label>
            <input
              name="title"
              value={form.translations[selectedLang]?.title || ""}
              onChange={handleChange}
            />

            <label>Content ({selectedLang})</label>
            <textarea
              name="content"
              value={form.translations[selectedLang]?.content || ""}
              onChange={handleChange}
              rows={5}
            />

            <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
              <button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : editBlogId ? "Update" : "Create"}
              </button>
              {editBlogId && (
                <button onClick={handleDelete} className="delete-btn">Delete</button>
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
              <th>Slug</th>
              <th>Published</th>
              <th>Date</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b._id} onClick={() => openBlogModal(b)} style={{ cursor: "pointer" }}>
                <td>{b.slug}</td>
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
