import React, { useState, useEffect } from "react";
import { Search, Trash2, UserRoundPlus } from "lucide-react";
import apiService from "../../services/api";

const AdminUser = () => {
  const [admins, setAdmins] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [filterAdmins, setFilterAdmins] = useState([]);
  const [filterCustomer, setFilterCustomer] = useState([]);
  const [search, setSearch] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page when searching

    setFilterAdmins(
      admins.filter((user) =>
        user?.name?.toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    );

    setFilterCustomer(
      customer.filter((user) =>
        user?.name?.toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    );
  };

  // Calculate pagination info
  useEffect(() => {
    window.scrollTo(0, 0);

    setTotalPages(Math.ceil(filterCustomer.length / itemsPerPage));
  }, [filterCustomer, itemsPerPage]);

  // Get current customers
  const getCurrentCustomers = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filterCustomer.slice(indexOfFirstItem, indexOfLastItem);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Phân Quyền Người Dùng";

    apiService
      .getUsers("ADMIN")
      .then((res) => {
        setAdmins(res.data.data.users);
        setFilterAdmins(res.data.data.users);
      })
      .catch((err) => {
        console.log("Error get list admin: ", err);
      });
    apiService
      .getUsers("CUSTOMER")
      .then((res) => {
        setCustomer(res.data.data.users);
        setFilterCustomer(res.data.data.users);
      })
      .catch((err) => {
        console.log("Error get list customer: ", err);
      });
  }, []);

  // Mobile responsive table row component
  const UsersRow = ({ user, isMobile }) => {
    if (isMobile) {
      return (
        <div className="space-y-3 border-b p-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-sm font-medium">#{user._id.slice(-6)}</span>
            </div>
            {user.role === "ADMIN" ? (
              <button
                className="rounded-lg p-2 text-[#FF3D00] transition-colors hover:bg-[#FF3D00] hover:text-white"
                onClick={() => {
                  apiService
                    .postRevokeAdmin(user.email)
                    .then(() => {
                      alert("Thu hồi quyền admin thành công");
                      window.location.reload();
                    })
                    .catch((err) => {
                      alert("Thu hồi quyền admin thất bại");
                      console.log(err);
                    });
                }}
              >
                <Trash2 size={18} />
              </button>
            ) : (
              <button
                className="rounded-lg p-2 text-[#FF3D00] transition-colors hover:bg-[#FF3D00] hover:text-white"
                onClick={() => {
                  apiService
                    .postGrantAdmin(user.email)
                    .then(() => {
                      alert("Cấp quyền admin thành công");
                      window.location.reload();
                    })
                    .catch((err) => {
                      alert("Cấp quyền admin thất bại");
                      console.log(err);
                    });
                }}
              >
                <UserRoundPlus size={18} />
              </button>
            )}
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium">{user?.name}</div>
            <span className="text-sm text-gray-600">
              Email: {user?.email} | @{user?.username}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">
              Ngày tham gia: {formatDate(user.createdAt)}
            </span>
          </div>
        </div>
      );
    }

    return (
      <tr className="hover:bg-gray-50">
        <td className="p-4 text-gray-600">{user._id.slice(-6)}</td>
        <td className="p-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user?.name}</span>
          </div>
        </td>
        <td className="p-4 text-gray-600">@{user.username}</td>
        <td className="p-4 text-gray-600">{user.address}</td>
        <td className="p-4 text-gray-600">{user.email}</td>
        <td className="p-4">
          {user.role === "ADMIN" ? (
            <button
              className="rounded-lg p-2 text-[#FF3D00] transition-colors hover:bg-[#FF3D00] hover:text-white"
              onClick={() => {
                apiService
                  .postRevokeAdmin(user.email)
                  .then(() => {
                    alert("Thu hồi quyền admin thành công");
                    window.location.reload();
                  })
                  .catch((err) => {
                    alert("Thu hồi quyền admin thất bại");
                    console.log(err);
                  });
              }}
            >
              <Trash2 size={18} />
            </button>
          ) : (
            <button
              className="rounded-lg p-2 text-[#FF3D00] transition-colors hover:bg-[#FF3D00] hover:text-white"
              onClick={() => {
                apiService
                  .postGrantAdmin(user.email)
                  .then(() => {
                    alert("Cấp quyền admin thành công");
                    window.location.reload();
                  })
                  .catch((err) => {
                    alert("Cấp quyền admin thất bại");
                    console.log(err);
                  });
              }}
            >
              <UserRoundPlus size={18} />
            </button>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white">
        {/* Header Section */}
        <div className="border-b p-4 md:p-6">
          <h1 className="font-bold text-[#FF3D00] md:mb-6 md:text-2xl">
            Phân quyền người dùng
          </h1>

          {/* Search and Filter Toggle */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <input
                type="text"
                name="search"
                placeholder="Search users..."
                className="w-full rounded-lg border py-2 pl-10 pr-4 focus:border-[#FF3D00] focus:outline-none"
                value={search}
                onChange={handleSearchChange}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
          </div>
        </div>

        {/* Table Section - Desktop - List Admin*/}
        <div className="hidden overflow-x-auto md:block">
          <h2 className="pt-5 text-center font-bold text-[#FF3D00] md:mb-6 md:text-xl">
            Quản trị viên
          </h2>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  ID
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Tên
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Username
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Địa chỉ
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Email
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Thu hồi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filterAdmins?.map((user) => (
                <UsersRow key={user._id} user={user} isMobile={false} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Section - Desktop - List Customer*/}
        <div className="hidden overflow-x-auto md:block">
          <h2 className="pt-5 text-center font-bold text-[#FF3D00] md:mb-6 md:text-xl">
            Người dùng
          </h2>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  ID
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Tên
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Username
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Địa chỉ
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Email
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Thu hồi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {getCurrentCustomers().map((user) => (
                <UsersRow key={user._id} user={user} isMobile={false} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View - ADMIN */}
        <div className="md:hidden">
          <h2 className="pt-5 text-center font-bold text-[#FF3D00] md:mb-6 md:text-xl">
            Quản trị viên
          </h2>
          {filterAdmins.map((user) => (
            <UsersRow key={user._id} user={user} isMobile={true} />
          ))}
        </div>

        {/* Mobile Card View - CUSTOMER */}
        <div className="md:hidden">
          <h2 className="pt-5 text-center font-bold text-[#FF3D00] md:mb-6 md:text-xl">
            Người dùng
          </h2>
          {getCurrentCustomers().map((user) => (
            <UsersRow key={user._id} user={user} isMobile={true} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center justify-between gap-4 border-t p-4 sm:flex-row">
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <select
              name="limit"
              className="rounded-lg border p-2 focus:border-[#FF3D00] focus:outline-none"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <span className="whitespace-nowrap text-sm text-gray-600">
              per page
            </span>
          </div>

          <div className="flex w-full items-center justify-center gap-2 sm:w-auto sm:justify-end">
            <button
              className="rounded-lg border px-4 py-2 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="rounded-lg border px-4 py-2 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUser;
