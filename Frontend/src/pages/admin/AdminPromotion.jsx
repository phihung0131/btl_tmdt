import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit, Search, X } from "lucide-react";
import apiService from "../../services/api";
import PromotionManagement from "../../components/admin/promotion/PromotionManagement";

const AdminPromotion = () => {
  const [promotions, setPromotions] = useState([]);
  const [filterPromotions, setFilterPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setFilterPromotions(
      promotions.filter((promotion) =>
        promotion.name.toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  useEffect(() => {
    setFilterPromotions(promotions);
  }, [promotions]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Quản Lý Khuyến Mãi";

    apiService
      .getPromotions()
      .then((res) => {
        // console.log(res.data.data.promotions);
        setPromotions(res.data.data.promotions);
      })
      .catch((err) => {
        console.log("Error fetching promotions:", err);
      });
  }, []);

  // Mobile responsive table row component
  const PromotionRow = ({ promotion, isMobile }) => {
    if (isMobile) {
      return (
        <div className="space-y-3 border-b p-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-sm font-medium">
                #{promotion._id.slice(-6)}
              </span>
            </div>
            <button
              className="rounded-lg p-2 text-[#FF3D00] transition-colors hover:bg-[#FF3D00] hover:text-white"
              onClick={() => {
                setSelectedPromotion(promotion);
                setIsModalOpen(true);
              }}
            >
              <Edit size={18} />
            </button>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium">{promotion?.name}</div>
            {promotion.product && (
              <Link
                to={`/admin/products/${promotion?.product?._id}`}
                className="text-[#FF3D00] hover:underline"
              >
                Sản phẩm: {promotion?.product?.name}
              </Link>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">
              {promotion.discountPercent}% - Ngày kết thúc:{" "}
              {formatDate(promotion.endDate)}
            </span>
          </div>
        </div>
      );
    }

    return (
      <tr className="hover:bg-gray-50">
        <td className="p-4 text-sm">{promotion._id.slice(-6)}</td>
        <td className="p-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium">{promotion?.name}</span>
          </div>
        </td>
        <td className="p-4 font-medium">{promotion.discountPercent}%</td>
        <td className="p-4 font-medium">
          {promotion.product && (
            <Link
              to={`/admin/products/${promotion.product._id}`}
              className="text-[#FF3D00] hover:underline"
            >
              {promotion?.product?.name}
            </Link>
          )}
        </td>
        <td className="p-4 text-sm text-gray-600">
          {formatDate(promotion.startDate)} - {formatDate(promotion.endDate)}
        </td>
        <td className="p-4">
          <button
            className="rounded-lg p-2 text-[#FF3D00] transition-colors hover:bg-[#FF3D00] hover:text-white"
            onClick={() => {
              setSelectedPromotion(promotion);
              setIsModalOpen(true);
            }}
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
            Quản lý khuyến mãi
          </h1>

          {/* Search and Filter Toggle */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <input
                type="text"
                name="search"
                placeholder="Search promotions..."
                className="w-full rounded-lg border py-2 pl-10 pr-4 focus:border-[#FF3D00] focus:outline-none"
                value={search}
                onChange={(e) => {
                  handleSearchChange(e);
                }}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
          </div>
        </div>

        {/* Table Section - Desktop */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  ID
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Tên khuyến mãi
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Phần trăm giảm giá
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Sản phẩm
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Ngày bắt đầu/kết thúc
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Cập nhật
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filterPromotions?.map((promotion) => (
                <PromotionRow
                  key={promotion._id}
                  promotion={promotion}
                  isMobile={false}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden">
          {promotions.map((promotion) => (
            <PromotionRow
              key={promotion._id}
              promotion={promotion}
              isMobile={true}
            />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => {
              setSelectedPromotion(null);
              setIsModalOpen(false);
            }}
          />

          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
            {/* Close button */}
            <button
              onClick={() => {
                setSelectedPromotion(null);
                setIsModalOpen(false);
              }}
              className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100"
            >
              <X size={20} />
            </button>

            <div className="mt-6">
              <PromotionManagement promotion={selectedPromotion} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPromotion;
