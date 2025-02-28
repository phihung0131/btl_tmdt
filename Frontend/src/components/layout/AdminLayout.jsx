import { Outlet } from "react-router-dom";
import Sidebar from "../admin/common/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
