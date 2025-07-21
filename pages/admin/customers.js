import React from "react";
import Customer from "@/components/Admin/AdminCustomers";
import AdminLayout from "@/components/Admin/AdminLayout";

const AdminCustomerPage = () => {
  return <AdminLayout>
            <Customer />
        </AdminLayout>;
};

export default AdminCustomerPage;
