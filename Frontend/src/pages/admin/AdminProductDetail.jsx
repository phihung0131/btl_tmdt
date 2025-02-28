import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Edit2,
  Trash2,
  Tag,
  ChevronLeft,
  ChevronRight,
  Box,
  ShoppingBag,
  DollarSign,
  Layers,
  BadgeDollarSign,
} from "lucide-react";

import EditModal from "../../components/admin/product/EditModal";
import PromotionModal from "../../components/admin/product/PromotionModal";

import apiService from "../../services/api";
import PromotionManagement from "../../components/admin/promotion/PromotionManagement";

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

const AdminProductDetail = () => {
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingPromotion, setIsAddingPromotion] = useState(false);
  const [product, setProduct] = useState(null);
  const [promotions, setPromotions] = useState([]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product?.imageUrl?.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product?.imageUrl?.length - 1 ? 0 : prev + 1,
    );
  };

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      // Handle delete logic here
      apiService.deleteProduct(product?._id);
      console.log("Deleting product:", product?._id);
      navigate("/admin/products");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Quản Lý Sản Phẩm Chi Tiết";

    apiService
      .getAProduct(id)
      .then((res) => {
        // console.log("Product detail:", res.data);
        setProduct(res.data.data);
      })
      .catch((err) => {
        console.error("Get product detail failed:", err);
      });

    apiService
      .getPromotionsForProduct(id)
      .then((res) => {
        // console.log("Promotions:", res.data.data.promotions);
        setPromotions(res.data.data.promotions);
      })
      .catch((err) => {
        console.error("Get promotions failed:", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="container mx-auto overflow-hidden rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between bg-[#FF3D00] p-4 text-white">
          <div>
            <h1 className="text-2xl font-bold">{product?.name}</h1>
            <p className="text-sm opacity-80">{product?.category?.name}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-full bg-white/20 p-2 transition hover:bg-white/30"
            >
              <Edit2 size={20} className="text-white" />
            </button>
            <button
              onClick={handleDelete}
              className="rounded-full bg-white/20 p-2 transition hover:bg-white/30"
            >
              <Trash2 size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 p-6 md:grid-cols-3">
          {/* Image Gallery */}
          <div className="space-y-4 md:col-span-1">
            <div className="relative overflow-hidden rounded-lg shadow-md">
              <img
                src={product?.imageUrl[currentImageIndex]}
                alt={product?.name}
                className="h-80 w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-between p-2">
                <button
                  onClick={handlePrevImage}
                  className="rounded-full bg-white/50 p-2 hover:bg-white/70"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="rounded-full bg-white/50 p-2 hover:bg-white/70"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product?.imageUrl.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-20 w-full cursor-pointer rounded-lg object-cover ${currentImageIndex === index ? "ring-2 ring-[#FF3D00]" : ""}`}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6 md:col-span-2">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Price Card */}
              <div className="rounded-lg bg-gray-100 p-4 shadow-sm">
                <div className="mb-2 flex items-center">
                  <DollarSign size={20} className="mr-2 text-[#FF3D00]" />
                  <h3 className="font-semibold text-gray-700">Giá sản phẩm</h3>
                </div>
                <p className="text-2xl font-bold text-[#FF3D00]">
                  {product?.price.toLocaleString("vi-VN")} ₫
                </p>
                {!product?.promotionalPrice && auth.role === "OWNER" && (
                  <button
                    onClick={() => setIsAddingPromotion(true)}
                    className="mt-2 flex items-center text-sm text-[#FF3D00] hover:underline"
                  >
                    <Tag size={16} className="mr-1" />
                    Thêm khuyến mãi
                  </button>
                )}
              </div>

              {/* Inventory Card */}
              <div className="rounded-lg bg-gray-100 p-4 shadow-sm">
                <div className="mb-2 flex items-center">
                  <Box size={20} className="mr-2 text-[#FF3D00]" />
                  <h3 className="font-semibold text-gray-700">Tồn kho</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {product?.colorSummary.map((color) => (
                    <div key={color.color} className="flex items-center">
                      <div
                        className="mr-2 h-4 w-4 rounded-full"
                        style={{
                          backgroundColor:
                            color.color in COLORS
                              ? COLORS[color.color]
                              : COLORS.Black,
                        }}
                      />
                      <span>{color.color}</span>
                      <span className="ml-auto font-bold">
                        {color.sizes.reduce(
                          (sum, size) => sum + size.quantity,
                          0,
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-lg bg-gray-100 p-4 shadow-sm">
              <div className="mb-2 flex items-center">
                <ShoppingBag size={20} className="mr-2 text-[#FF3D00]" />
                <h3 className="font-semibold text-gray-700">Mô tả sản phẩm</h3>
              </div>
              <p className="text-gray-600">{product?.description}</p>
            </div>

            {/* Color and Size Details */}
            <div className="rounded-lg bg-gray-100 p-4 shadow-sm">
              <div className="mb-2 flex items-center">
                <Layers size={20} className="mr-2 text-[#FF3D00]" />
                <h3 className="font-semibold text-gray-700">
                  Chi tiết kích thước
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2 text-left">Màu sắc</th>
                      <th className="p-2 text-center">Size</th>
                      <th className="p-2 text-right">Số lượng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product?.colorSummary.flatMap((color) =>
                      color.sizes.map((size) => (
                        <tr
                          key={`${color.color}-${size.size}`}
                          className="border-b"
                        >
                          <td className="flex items-center p-2">
                            <div
                              className="mr-2 h-4 w-4 rounded-full"
                              style={{
                                backgroundColor:
                                  color.color in COLORS
                                    ? COLORS[color.color]
                                    : COLORS.Black,
                              }}
                            />
                            {color.color}
                          </td>
                          <td className="p-2 text-center">{size.size}</td>
                          <td className="p-2 text-right font-bold">
                            {size.quantity}
                          </td>
                        </tr>
                      )),
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Promotions */}
            {promotions.length > 0 && (
              <div className="rounded-lg bg-gray-100 px-4 pt-4 shadow-sm">
                <div className="mb-2 flex items-center">
                  <BadgeDollarSign size={20} className="mr-2 text-[#FF3D00]" />
                  <h3 className="font-semibold text-gray-700">
                    Khuyến mãi sản phẩm
                  </h3>
                </div>
                {promotions?.map((promotion) => (
                  <PromotionManagement
                    key={promotion._id}
                    promotion={promotion}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        product={product}
      />

      <PromotionModal
        isOpen={isAddingPromotion}
        onClose={() => setIsAddingPromotion(false)}
        productId={product?._id}
      />
    </div>
  );
};

export default AdminProductDetail;
