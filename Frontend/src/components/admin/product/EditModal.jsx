import React, { useEffect, useState } from "react";
import { X, Plus, Trash } from "lucide-react";
import apiService from "../../../services/api";

const COLORS = {
  Black: "#000000",
  Gray: "#808080",
  Orange: "#FFA500",
  Red: "#FF0000",
  Yellow: "#FFFF00",
  Green: "#008000",
  Blue: "#0000FF",
  Purple: "#800080",
  Pink: "#FFC0CB",
  White: "#FFFFFF",
  Gold: "#FFD700",
};

const EditModal = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    categoryId: product?.category?._id || "",
    infos:
      product?.colorSummary?.flatMap((color) =>
        color.sizes.map((size) => ({
          color: color.color,
          size: size.size,
          quantity: size.quantity,
        })),
      ) || [],
  });

  const handleAddInfo = () => {
    setFormData({
      ...formData,
      infos: [...formData.infos, { color: "White", size: "", quantity: "" }],
    });
  };

  const handleRemoveInfo = (index) => {
    setFormData({
      ...formData,
      infos: formData.infos.filter((_, i) => i !== index),
    });
  };

  const handleInfoChange = (index, field, value) => {
    const newInfos = [...formData.infos];
    newInfos[index] = { ...newInfos[index], [field]: value };
    setFormData({ ...formData, infos: newInfos });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const editData = {
      ...formData,
      price: Number(formData.price),
      infos: formData.infos.map((info) => ({
        ...info,
        size: Number(info.size),
        quantity: Number(info.quantity),
      })),
    };

    apiService
      .putProduct(
        product._id,
        editData.name,
        editData.description,
        editData.price,
        editData.infos,
      )
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
    onClose();
    window.location.reload();
  };

  useEffect(() => {
    setFormData({
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || "",
      categoryId: product?.category?._id || "",
      infos:
        product?.colorSummary?.flatMap((color) =>
          color.sizes.map((size) => ({
            color: color.color,
            size: size.size,
            quantity: size.quantity,
          })),
        ) || [],
    });
  }, [product]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Chỉnh sửa sản phẩm</h2>
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
              Tên sản phẩm
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
              Giá
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full rounded-md border p-2"
              required
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Thông tin màu sắc và kích thước
              </label>
              <button
                type="button"
                onClick={handleAddInfo}
                className="flex items-center gap-1 text-[#FF3D00] hover:text-[#FF3D00]/80"
              >
                <Plus size={16} />
                Thêm
              </button>
            </div>

            <div className="space-y-2">
              {formData.infos.map((info, index) => (
                <div key={index} className="flex items-center gap-2">
                  <select
                    value={info.color}
                    onChange={(e) =>
                      handleInfoChange(index, "color", e.target.value)
                    }
                    className="flex-1 rounded-md border p-2"
                  >
                    {Object.entries(COLORS).map(([name, hex]) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    placeholder="Size"
                    value={info.size}
                    onChange={(e) =>
                      handleInfoChange(index, "size", e.target.value)
                    }
                    className="w-24 rounded-md border p-2"
                  />

                  <input
                    type="number"
                    placeholder="Số lượng"
                    value={info.quantity}
                    onChange={(e) =>
                      handleInfoChange(index, "quantity", e.target.value)
                    }
                    className="w-24 rounded-md border p-2"
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveInfo(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))}
            </div>
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
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
