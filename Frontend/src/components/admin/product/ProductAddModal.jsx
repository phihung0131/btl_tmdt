import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

const ProductAddModal = ({ isShow, onClose, onSubmit }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState([]);
  const [infos, setInfos] = useState([{ color: "", size: "", quantity: "" }]);

  const categories = [
    {
      _id: "66f62476c8ffe5afc825e218",
      name: "Giày cầu lông nữ",
      description: "Các mẫu giày thể thao dành cho nam giới",
    },
    {
      _id: "66f62476c8ffe5afc825e219",
      name: "Giày thể thao kid",
      description: "Các mẫu giày thể thao dành cho nữ giới",
    },
    {
      _id: "66f62476c8ffe5afc825e21a",
      name: "Giày cao gót nữ",
      description: "Các mẫu giày lười tiện lợi dành cho nam",
      deleted: false,
    },
    {
      _id: "66f62476c8ffe5afc825e21c",
      name: "Giày chạy bộ nam",
      description: "Các mẫu giày cao gót thời trang",
    },
    {
      _id: "66f62476c8ffe5afc825e21e",
      name: "Giày tây nam",
      description: "Dép sandal tiện lợi cho nam giới",
    },
    {
      _id: "66f62476c8ffe5afc825e21f",
      name: "Sandal nam",
      description: "Dép sandal thời trang cho nữ giới",
    },
    {
      _id: "66f62476c8ffe5afc825e220",
      name: "Giày búp bê nữ",
      description: "Giày dành cho nam giúp tăng chiều cao",
    },
    {
      _id: "66f62476c8ffe5afc825e221",

      name: "Sandal nữ",
      description: "Giày chống nước chuyên dụng",
    },
    {
      _id: "66f62476c8ffe5afc825e222",
      name: "Boot nữ",
      description: "Các mẫu giày thời trang dành cho nam giới",
    },
    {
      _id: "66f62476c8ffe5afc825e223",
      name: "Giày đá bóng nam",
      description: "Các mẫu giày thời trang dành cho nữ giới",
    },
    {
      _id: "66f62476c8ffe5afc825e224",
      name: "Giày chạy bộ nữ",
      description: "Dép xỏ ngón phong cách dành cho nam",
    },
    {
      _id: "66f62476c8ffe5afc825e225",
      name: "Sandal kid",
      description: "Dép xỏ ngón thời trang dành cho nữ",
    },
    {
      _id: "66f62476c8ffe5afc825e226",
      name: "Dép kid",
      description: "Giày sneaker phong cách dành cho nam",
    },
    {
      _id: "66f62476c8ffe5afc825e229",

      name: "Giày cầu lông nam",
      description: "Giày công sở thời trang dành cho nữ",
    },
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length <= 5) {
      setImages([...images, ...files]);
    } else {
      alert("Tối đa 5 hình ảnh");
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const addInfoRow = () => {
    if (infos.length < 5) {
      setInfos([...infos, { color: "", size: "", quantity: "" }]);
    }
  };

  const updateInfoRow = (index, field, value) => {
    const newInfos = [...infos];
    newInfos[index][field] = value;
    setInfos(newInfos);
  };

  const removeInfoRow = (index) => {
    const newInfos = infos.filter((_, i) => i !== index);
    setInfos(newInfos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("categoryId", categoryId);
    formData.append("infos", JSON.stringify(infos));

    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    // console.log("FormData Contents:");
    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }

    apiService
      .postProduct(formData)
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
        navigate(`/admin/products/${res.data.data.product._id}`);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
    onSubmit(formData);
  };

  if (!isShow) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-h-[90vh] w-[600px] overflow-y-auto rounded-lg bg-white p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="mb-4 text-2xl font-bold text-[#FF3D00]">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Images (Max 5)
            </label>
            <div className="mt-2 flex space-x-2">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-[#FF3D00] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#ff6347]"
              />
            </div>
            <div className="mt-2 flex space-x-2">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`preview ${index}`}
                    className="h-20 w-20 rounded object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute right-0 top-0 rounded-full bg-red-500 p-1 text-white"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Details
            </label>
            {infos.map((info, index) => (
              <div key={index} className="mb-2 flex items-center space-x-2">
                <select
                  value={info.color}
                  onChange={(e) =>
                    updateInfoRow(index, "color", e.target.value)
                  }
                  className="w-1/3 rounded-md border border-gray-300 px-2 py-1"
                  required
                >
                  <option value="">Color</option>
                  {Object.keys(COLORS).map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Size"
                  value={info.size}
                  onChange={(e) => updateInfoRow(index, "size", e.target.value)}
                  className="w-1/3 rounded-md border border-gray-300 px-2 py-1"
                  required
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={info.quantity}
                  onChange={(e) =>
                    updateInfoRow(index, "quantity", e.target.value)
                  }
                  className="w-1/3 rounded-md border border-gray-300 px-2 py-1"
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeInfoRow(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            ))}
            {infos.length < 5 && (
              <button
                type="button"
                onClick={addInfoRow}
                className="flex items-center text-[#FF3D00] hover:text-[#ff6347]"
              >
                <Plus size={16} className="mr-1" /> Add Detail
              </button>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-[#FF3D00] px-4 py-2 text-white hover:bg-[#ff6347]"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAddModal;
