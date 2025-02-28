import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Search, Filter, ChevronDown } from "lucide-react";
import apiService from "../../services/api";

const statusColors = {
  "Success": "bg-green-500",
  "Failure": "bg-red-500",
  "Delivering": "bg-blue-500",
  "Order successful": "bg-green-400",
  "Preparing goods": "bg-yellow-500",
  "Waiting for payment": "bg-orange-500",
};

const AdminOrder = () => {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    status: "",
    search: "",
    startDate: "",
    endDate: "",
    minTotal: "",
    maxTotal: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Quản Lý Đơn Hàng";

    apiService
      .getAdminOrders(
        filter.page,
        filter.limit,
        filter.status,
        filter.search,
        filter.startDate,
        filter.endDate,
        filter.minTotal,
        filter.maxTotal,
      )
      .then((res) => {
        setOrders(res.data.data.orders);
        setTotalOrders(res.data.data.totalOrders);
      })
      .catch((err) => console.log(err));
  }, [filter]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilter({
      page: 1,
      limit: 10,
      status: "",
      search: "",
      startDate: "",
      endDate: "",
      minTotal: "",
      maxTotal: "",
    });
  };

  // Mobile responsive table row component
  const OrderRow = ({ order, isMobile }) => {
    if (isMobile) {
      return (
        <div className="space-y-3 border-b p-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-sm font-medium">
                #{order._id.slice(-6)}
              </span>
              <div className="mt-1">
                <span
                  className={`rounded-full px-2 py-1 text-xs text-white ${statusColors[order.status] || "bg-gray-500"}`}
                >
                  {order.status}
                </span>
              </div>
            </div>
            <button
              className="rounded-lg p-2 text-[#FF3D00] transition-colors hover:bg-[#FF3D00] hover:text-white"
              onClick={() => navigate(order._id)}
            >
              <Edit size={18} />
            </button>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium">{order.name}</div>
            <div className="text-sm text-gray-500">{order.phone}</div>
            <div className="text-sm text-gray-500">{order.address}</div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{formatPrice(order.totalPrice)}</span>
            <span className="text-gray-500">{formatDate(order.createdAt)}</span>
          </div>
        </div>
      );
    }

    return (
      <tr className="hover:bg-gray-50">
        <td className="p-4 text-sm">{order._id.slice(-6)}</td>
        <td className="p-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium">{order.name}</span>
            <span className="text-sm text-gray-500">{order.phone}</span>
            <span className="text-sm text-gray-500">{order.address}</span>
          </div>
        </td>
        <td className="p-4">
          <span
            className={`rounded-full px-3 py-1 text-sm text-white ${statusColors[order.status] || "bg-gray-500"}`}
          >
            {order.status}
          </span>
        </td>
        <td className="p-4 font-medium">{formatPrice(order.totalPrice)}</td>
        <td className="p-4 text-sm text-gray-600">
          {formatDate(order.createdAt)}
        </td>
        <td className="p-4">
          <button
            className="rounded-lg p-2 text-[#FF3D00] transition-colors hover:bg-[#FF3D00] hover:text-white"
            onClick={() => navigate(order._id)}
          >
            <Edit size={20} />
          </button>
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
            Quản lý đơn hàng
          </h1>

          {/* Search and Filter Toggle */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <input
                type="text"
                name="search"
                placeholder="Search orders..."
                className="w-full rounded-lg border py-2 pl-10 pr-4 focus:border-[#FF3D00] focus:outline-none"
                value={filter.search}
                onChange={handleFilterChange}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center justify-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-50"
            >
              <Filter size={20} />
              <span className="hidden sm:inline">Filters</span>
              <ChevronDown
                size={20}
                className={`transition-transform ${showFilter ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* Expandable Filter Section */}
          {showFilter && (
            <div className="mt-4 space-y-4 rounded-lg bg-gray-50 p-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    className="w-full rounded-lg border p-2 focus:border-[#FF3D00] focus:outline-none"
                    value={filter.status}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Status</option>
                    <option value="Success">Success</option>
                    <option value="Failure">Failure</option>
                    <option value="Delivering">Delivering</option>
                    <option value="Order successful">Order successful</option>
                    <option value="Preparing goods">Preparing goods</option>
                    <option value="Waiting for payment">
                      Waiting for payment
                    </option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    className="w-full rounded-lg border p-2 focus:border-[#FF3D00] focus:outline-none"
                    value={filter.startDate}
                    onChange={handleFilterChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    className="w-full rounded-lg border p-2 focus:border-[#FF3D00] focus:outline-none"
                    value={filter.endDate}
                    onChange={handleFilterChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Price Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="minTotal"
                      placeholder="Min"
                      className="w-full rounded-lg border p-2 focus:border-[#FF3D00] focus:outline-none"
                      value={filter.minTotal}
                      onChange={handleFilterChange}
                    />
                    <input
                      type="number"
                      name="maxTotal"
                      placeholder="Max"
                      className="w-full rounded-lg border p-2 focus:border-[#FF3D00] focus:outline-none"
                      value={filter.maxTotal}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={resetFilters}
                  className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowFilter(false)}
                  className="rounded-lg bg-[#FF3D00] px-4 py-2 text-white hover:bg-[#ff4d00]"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Table Section - Desktop */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Order ID
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Khách hàng
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Trạng thái
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Tổng tiền
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Ngày tạo
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Cập nhật
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <OrderRow key={order._id} order={order} isMobile={false} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden">
          {orders.map((order) => (
            <OrderRow key={order._id} order={order} isMobile={true} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center justify-between gap-4 border-t p-4 sm:flex-row">
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <select
              name="limit"
              className="rounded-lg border p-2 focus:border-[#FF3D00] focus:outline-none"
              value={filter.limit}
              onChange={handleFilterChange}
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
              onClick={() =>
                setFilter((prev) => ({ ...prev, page: prev.page - 1 }))
              }
              disabled={filter.page === 1}
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">Page {filter.page}</span>
            <button
              className="rounded-lg border px-4 py-2 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
              onClick={() =>
                setFilter((prev) => ({ ...prev, page: prev.page + 1 }))
              }
              disabled={filter.page * filter.limit >= totalOrders}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrder;
