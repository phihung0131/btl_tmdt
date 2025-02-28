import React, { useState } from "react";
import { X } from "lucide-react";

import apiService from "../../../services/api";

const PromotionModal = ({ isOpen, onClose, productId }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    discountPercent: "",
    startDate: "",
    endDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const promotionData = {
      product: productId,
      ...formData,
      discountPercent: Number(formData.discountPercent),
    };

    console.log("Submitting promotion:", promotionData);

    apiService
      .postPromotion(
        productId,
        promotionData.name,
        promotionData.description,
        promotionData.discountPercent,
        promotionData.startDate,
        promotionData.endDate,
      )
      .then((res) => {
        alert("Thêm khuyến mãi thành công!");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error creating promotion:", err);
        alert(err.response.data.message);
      });

    setFormData({
      name: "",
      description: "",
      discountPercent: "",
      startDate: "",
      endDate: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Thêm khuyến mãi</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Tên khuyến mãi
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full rounded-md border p-2"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Mô tả
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full rounded-md border p-2"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Phần trăm giảm giá
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.discountPercent}
              onChange={(e) =>
                setFormData({ ...formData, discountPercent: e.target.value })
              }
              className="w-full rounded-md border p-2"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Ngày bắt đầu
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              className="w-full rounded-md border p-2"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Ngày kết thúc
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              className="w-full rounded-md border p-2"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 text-gray-600 hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded-md bg-[#FF3D00] px-4 py-2 text-white hover:bg-[#FF3D00]/90"
            >
              Thêm khuyến mãi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromotionModal;
