import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <div className="admin-panel">
      <aside className="admin-sidebar">
        <Link href="/profile" passHref legacyBehavior>
          <a style={{ color: "#388e3c", textDecoration: "none", marginTop: 0, marginBottom: 10, display: "inline-block" }}>
            <i className="fas fa-arrow-left"></i> MyProfile
          </a>
        </Link>
        <Link href="/admin" className={pathname === "/admin" ? "active" : ""}>Dashboard</Link>
        <Link href="/admin/orders" className={pathname.startsWith("/admin/orders") ? "active" : ""}>Orders</Link>
        <Link href="/admin/customers" className={pathname.startsWith("/admin/customers") ? "active" : ""}>Customers</Link>
        <Link href="/admin/products" className={pathname.startsWith("/admin/products") ? "active" : ""}>Products</Link>
        <Link href="/admin/blogs" className={pathname.startsWith("/admin/blogs") ? "active" : ""}>Blogs</Link>
        <Link href="/admin/donation" className={pathname.startsWith("/admin/donation") ? "active" : ""}>Donations</Link>
      </aside>

      <main className="admin-content">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
