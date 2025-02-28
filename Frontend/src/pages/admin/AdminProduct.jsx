import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Search } from "lucide-react";
import apiService from "../../services/api";
import ProductAddModal from "../../components/admin/product/ProductAddModal";

const AdminProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    search: "",
  });

  const [isModalShow, setIsModalShow] = useState(false);

  const handleSubmit = (formData) => {
    setIsModalShow(false);
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

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Quản Lý Sản Phẩm";

    apiService
      .getSearchProducts(
        filter.page,
        filter.limit,
        filter.search,
        "",
        "",
        "",
        "desc",
      )
      .then((res) => {
        // console.log(res.data.data);
        setProducts(res.data.data.products);
        setTotalProducts(res.data.data.totalItems);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filter]);

  // Mobile responsive table row component
  const ProductRow = ({ product, isMobile }) => {
    if (isMobile) {
      return (
        <div className="space-y-3 border-b p-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-sm font-medium">
                #{product._id.slice(-6)}
              </span>
            </div>
            <button
              className="rounded-lg p-2 text-[#FF3D00] transition-colors hover:bg-[#FF3D00] hover:text-white"
              onClick={() => navigate(product._id)}
            >
              <Edit size={18} />
            </button>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium">{product.name}</div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      );
    }

    return (
      <tr className="hover:bg-gray-50">
        <td className="p-4 text-sm">{product._id.slice(-6)}</td>
        <td className="p-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium">{product.name}</span>
          </div>
        </td>
        <td className="p-4">
          <img
            src={product.imageUrl[0]}
            alt={product.name}
            className="h-14 w-14"
          />
        </td>
        <td className="p-4 font-medium">{formatPrice(product.price)}</td>
        <td className="p-4 text-sm text-gray-600">
          Màu: {product.totalColors} - Size: {product.totalSizes} - Số lượng:{" "}
          {product.totalQuantity}
        </td>
        <td className="p-4">
          <button
            className="rounded-lg p-2 text-[#FF3D00] transition-colors hover:bg-[#FF3D00] hover:text-white"
            onClick={() => navigate(product._id)}
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
            Quản lý sản phẩm
          </h1>

          {/* Search and Filter Toggle */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <input
                type="text"
                name="search"
                placeholder="Search products..."
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
              onClick={() => setIsModalShow(true)}
              className="rounded-lg bg-[#FF3D00] px-16 font-bold text-white hover:bg-[#a74223]"
            >
              Thêm sản phẩm
            </button>
          </div>
        </div>

        <ProductAddModal
          isShow={isModalShow}
          onClose={() => setIsModalShow(false)}
          onSubmit={handleSubmit}
        />

        {/* Table Section - Desktop */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  ID
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Tên sản phẩm
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Hình ảnh
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Tiền
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Thông tin
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">
                  Cập nhật
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products?.map((product) => (
                <ProductRow
                  key={product._id}
                  product={product}
                  isMobile={false}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden">
          {products.map((product) => (
            <ProductRow key={product._id} product={product} isMobile={true} />
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
              disabled={filter.page * filter.limit >= totalProducts}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
