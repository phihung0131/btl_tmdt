import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Search,
  CheckCircle2,
  XCircle,
  Truck,
  CreditCard,
} from "lucide-react";

import Header from "../components/customer/common/Header";
import Footer from "../components/customer/common/Footer";
import apiService from "../services/api";

const StatusEdit = ({ currentStatus }) => {
  const statusConfig = {
    Success: {
      color: "bg-green-100 text-green-800",
      icon: CheckCircle2,
    },
    Failure: {
      color: "bg-red-100 text-red-800",
      icon: XCircle,
    },
    Delivering: {
      color: "bg-blue-100 text-blue-800",
      icon: Truck,
    },
    "Order successful": {
      color: "bg-green-100 text-green-800",
      icon: CheckCircle2,
    },
    "Preparing goods": {
      color: "bg-yellow-100 text-yellow-800",
      icon: Package,
    },
    "Waiting for payment": {
      color: "bg-orange-100 text-orange-800",
      icon: CreditCard,
    },
  };

  return (
    <div className="flex items-center gap-4">
      <div
        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
          statusConfig[currentStatus]?.color
        }`}
      >
        {statusConfig[currentStatus]?.icon &&
          React.createElement(statusConfig[currentStatus].icon, {
            className: "h-4 w-4",
          })}
        {currentStatus}
      </div>
    </div>
  );
};

const OrderList = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  // Filter orders based on search term
  const filteredOrders = orders.filter(
    (order) =>
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm) ||
      order._id.includes(searchTerm),
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  useEffect(() => {
    document.title = "Tiệm Giày Đóm | Đơn hàng";
    apiService
      .getOrders()
      .then((res) => {
        // console.log(res.data.data);
        setOrders(res.data.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Header />
      <div className="mx-auto min-h-[80vh] max-w-6xl p-6">
        {/* Header and Search */}
        <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <Package className="text-[#FF3D00]" />
            <span>Danh sách đơn hàng</span>
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="rounded-lg border py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF3D00]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          </div>
        </div>

        {/* Orders Grid */}
        <div className="mb-6 grid gap-4">
          {currentOrders.map((order) => (
            <div
              onClick={() => navigate(`/orders/${order._id}`)}
              key={order._id}
              className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="font-medium text-gray-900">{order.name}</h3>

                    <StatusEdit currentStatus={order.status} />
                  </div>

                  <div className="space-y-1 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4" /> {order.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> {order.address}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <p className="text-lg font-semibold text-[#FF3D00]">
                    {formatPrice(order.totalPrice)}
                  </p>
                  <div className="flex items-center gap-1 text-gray-600">
                    <ShoppingCart className="h-4 w-4" />
                    <span className="text-sm">
                      {order.totalProduct} sản phẩm
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {startIndex + 1}-
            {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of{" "}
            {filteredOrders.length} orders
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-lg border p-2 enabled:hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-8 w-8 rounded-lg ${
                  currentPage === page
                    ? "bg-[#FF3D00] text-white"
                    : "border hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="rounded-lg border p-2 enabled:hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderList;
