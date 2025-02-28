import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PencilIcon, Trash2Icon, X } from "lucide-react";
import apiService from "../../../services/api";

const PromotionManagement = ({ promotion }) => {
  const auth = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  const handleEdit = (promo) => {
    setSelectedPromotion(promo);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    // Xử lý xóa promotion
    apiService
      .deletePromotion(id)
      .then(() => {
        alert("Xóa khuyến mãi thành công");
        window.location.reload();
      })
      .catch((err) => {
        alert("Xóa khuyến mãi thất bại");
        console.log("Error deleting promotion:", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý cập nhật promotion
    console.log("Update promotion:", selectedPromotion);
    apiService
      .putPromotion(
        selectedPromotion._id,
        selectedPromotion.product,
        selectedPromotion.name,
        selectedPromotion.description,
        selectedPromotion.discountPercent,
        selectedPromotion.startDate,
        selectedPromotion.endDate,
      )
      .then(() => {
        alert("Cập nhật khuyến mãi thành công");
        window.location.reload();
      })
      .catch((err) => {
        alert("Cập nhật khuyến mãi thất bại");
        console.log("Error updating promotion:", err);
      });
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <div className="mx-auto w-full max-w-4xl p-4">
      {/* Card hiển thị promotion */}
      <div className="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold" style={{ color: "#ff3D00" }}>
            {promotion?.name}
          </h2>
          {auth.role === "OWNER" && (
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(promotion)}
                className="rounded-full p-2 transition-colors hover:bg-gray-100"
              >
                <PencilIcon className="h-5 w-5" style={{ color: "#ff3D00" }} />
              </button>
              <button
                onClick={() => handleDelete(promotion._id)}
                className="rounded-full p-2 transition-colors hover:bg-gray-100"
              >
                <Trash2Icon className="h-5 w-5 text-red-500" />
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">{promotion?.description}</p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Giảm giá</p>
              <p className="text-2xl font-bold" style={{ color: "#ff3D00" }}>
                {promotion?.discountPercent}%
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Thời gian</p>
              <p className="font-medium">
                {formatDate(promotion?.startDate)} -{" "}
                {formatDate(promotion?.endDate)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal chỉnh sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-lg font-semibold">Chỉnh sửa khuyến mãi</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-1 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tên khuyến mãi
                </label>
                <input
                  type="text"
                  value={selectedPromotion?.name}
                  onChange={(e) =>
                    setSelectedPromotion({
                      ...selectedPromotion,
                      name: e.target.value,
                    })
                  }
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mô tả
                </label>
                <textarea
                  value={selectedPromotion?.description}
                  onChange={(e) =>
                    setSelectedPromotion({
                      ...selectedPromotion,
                      description: e.target.value,
                    })
                  }
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phần trăm giảm giá
                </label>
                <input
                  type="number"
                  value={selectedPromotion?.discountPercent}
                  onChange={(e) =>
                    setSelectedPromotion({
                      ...selectedPromotion,
                      discountPercent: e.target.value,
                    })
                  }
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ngày bắt đầu
                  </label>
                  <input
                    type="date"
                    value={selectedPromotion?.startDate?.split("T")[0]}
                    onChange={(e) =>
                      setSelectedPromotion({
                        ...selectedPromotion,
                        startDate: e.target.value,
                      })
                    }
                    className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ngày kết thúc
                  </label>
                  <input
                    type="date"
                    value={selectedPromotion?.endDate?.split("T")[0]}
                    onChange={(e) =>
                      setSelectedPromotion({
                        ...selectedPromotion,
                        endDate: e.target.value,
                      })
                    }
                    className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="rounded-md px-4 py-2 text-white"
                  style={{ backgroundColor: "#ff3D00" }}
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionManagement;
