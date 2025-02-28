import React, { useState, useEffect } from "react";
import {
  Package,
  Phone,
  MapPin,
  Calendar,
  Tag,
  ShoppingBag,
  User,
  CircleDollarSign,
  CheckCircle2,
  XCircle,
  Truck,
  CreditCard,
} from "lucide-react";

import Footer from "../components/customer/common/Footer";
import Header from "../components/customer/common/Header";
import { useParams } from "react-router-dom";
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

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
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

  useEffect(() => {
    document.title = "Tiệm Giày Đóm | Chi tiết đơn hàng";
    apiService
      .getOrder(id)
      .then((res) => {
        setOrder(res.data.data.order);
        // console.log;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-4xl p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="flex items-center gap-2 text-2xl font-bold">
              <Package className="text-[#FF3D00]" />
              Đơn hàng chi tiết
            </h1>
            <span className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <StatusEdit currentStatus={order.status} />
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-1 flex items-center gap-1 text-sm text-gray-600">
                <Calendar className="h-4 w-4" /> Thời gian đặt
              </div>
              <div className="font-medium">{formatDate(order.createdAt)}</div>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-1 flex items-center gap-1 text-sm text-gray-600">
                <Tag className="h-4 w-4" /> ID Đơn hàng
              </div>
              <div className="truncate font-medium">{order._id}</div>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-1 flex items-center gap-1 text-sm text-gray-600">
                <ShoppingBag className="h-4 w-4" /> Sản phẩm
              </div>
              <div className="font-medium">
                {order?.products?.length} sản phẩm
              </div>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-1 flex items-center gap-1 text-sm text-gray-600">
                <CircleDollarSign className="h-4 w-4" /> Tổng tiền
              </div>
              <div className="font-medium text-[#FF3D00]">
                {formatPrice(order.totalPrice)}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="mb-8 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <User className="text-[#FF3D00]" />
            Thông tin khách hàng
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <div className="mb-1 text-gray-600">Hộ tên</div>
              <div className="font-medium">{order.name}</div>
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" /> Số điện thoại
              </div>
              <div className="font-medium">{order.phone}</div>
            </div>
            <div className="md:col-span-2">
              <div className="mb-1 flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" /> Địa chỉ giao hàng
              </div>
              <div className="font-medium">{order.address}</div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <ShoppingBag className="text-[#FF3D00]" />
            Danh sách sản phẩm
          </h2>
          <div className="space-y-4">
            {order?.products?.map((product) => (
              <div
                key={product._id}
                className="flex gap-4 rounded-lg bg-gray-50 p-4"
              >
                <img
                  src={product.productId.imageUrl}
                  alt={product.productId.name}
                  className="h-24 w-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="mb-2 font-medium">{product.productId.name}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Màu</div>
                      <div>{product.color}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Size</div>
                      <div>{product.size}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Số lượng</div>
                      <div>{product.quantity}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Giá</div>
                      <div className="font-medium text-[#FF3D00]">
                        {formatPrice(product.productId.price)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mt-6 border-t pt-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">Tổng số tiền</div>
              <div className="text-xl font-bold text-[#FF3D00]">
                {formatPrice(order.totalPrice)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default OrderDetail;
