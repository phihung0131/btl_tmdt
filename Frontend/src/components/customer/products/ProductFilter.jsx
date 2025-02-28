import React, { useState, useEffect } from "react";
import { Search, ArrowUpDown, Star } from "lucide-react";
import apiService from "../../../services/api";
const ProductFilter = (props) => {
  const [filters, setFilters] = useState({
    category: props.activeItem,
    page: 1,
    limit: 12,
    search: "",
    priceMin: "",
    priceMax: "",
    minRating: "",
    sortBy: "",
    sortOrder: "",
  });

  const [priceError, setPriceError] = useState("");
  const [ratingError, setRatingError] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    apiService
      .getSearchProducts(
        filters.page,
        filters.limit,
        filters.search,
        filters.category,
        `${filters.priceMin || 0}-${filters.priceMax || 99999999999}`,
        filters.sortBy,
        filters.sortOrder,
        filters.minRating,
      )
      .then((res) => {
        props.setProducts(res?.data?.data?.products);
        props.setTotalPages(res?.data?.data?.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filters]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    props.setCurrentPage(1);
  }, [
    filters.search,
    filters.category,
    filters.priceMin,
    filters.priceMax,
    filters.minRating,
    filters.sortBy,
    filters.sortOrder,
  ]);

  useEffect(() => {
    resetFilters();
  }, [props.activeItem]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      page: props.currentPage,
    }));
  }, [props.currentPage]);
  // Handle all input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate rating input
    if (name === "minRating") {
      const ratingValue = Number(value);
      if (ratingValue < 0 || ratingValue > 5) {
        setRatingError("Đánh giá phải từ 0 đến 5");
        return;
      }
      setRatingError("");
    }

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle price range validation
  useEffect(() => {
    if (filters.priceMin && filters.priceMax) {
      if (Number(filters.priceMin) > Number(filters.priceMax)) {
        setPriceError("Giá tối thiểu không được lớn hơn giá tối đa");
      } else {
        setPriceError("");
      }
    } else {
      setPriceError("");
    }
  }, [filters.priceMin, filters.priceMax]);

  // Toggle sort order
  const toggleSortOrder = () => {
    setFilters((prev) => ({
      ...prev,
      sortOrder: prev.sortOrder === "" ? "desc" : "",
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      page: 1,
      limit: 12,
      category: props.activeItem,
      search: "",
      priceMin: "",
      priceMax: "",
      minRating: "",
      sortBy: "",
      sortOrder: "",
    });
    setPriceError("");
    setRatingError("");
  };

  return (
    <div className="w-full rounded-lg bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-4">
        {/* Search Input */}
        <div className="relative min-w-[200px] flex-1">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleInputChange}
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full rounded-lg border py-2 pl-10 pr-4 outline-none transition-all focus:border-[#FF3D00] focus:ring-2 focus:ring-[#FF3D00]"
          />
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Price Range */}
        <div className="flex min-w-[300px] items-center gap-2">
          <input
            type="number"
            name="priceMin"
            value={filters.priceMin}
            onChange={handleInputChange}
            placeholder="Giá từ"
            className="w-24 rounded-lg border px-3 py-2 outline-none focus:border-[#FF3D00] focus:ring-2 focus:ring-[#FF3D00]"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            name="priceMax"
            value={filters.priceMax}
            onChange={handleInputChange}
            placeholder="đến"
            className="w-24 rounded-lg border px-3 py-2 outline-none focus:border-[#FF3D00] focus:ring-2 focus:ring-[#FF3D00]"
          />
        </div>

        {/* Minimum Rating */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="number"
              name="minRating"
              value={filters.minRating}
              onChange={handleInputChange}
              placeholder="Đánh giá tối thiểu"
              min="0"
              max="5"
              step="0.5"
              className="w-40 rounded-lg border px-3 py-2 outline-none focus:border-[#FF3D00] focus:ring-2 focus:ring-[#FF3D00]"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <Star className="h-4 w-4 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Sort By */}
        <div className="flex items-center gap-2">
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleInputChange}
            className="appearance-none rounded-lg border px-3 py-2 pr-8 outline-none focus:border-[#FF3D00] focus:ring-2 focus:ring-[#FF3D00]"
          >
            <option value="newest">Sắp xếp</option>
            <option value="name">Tên</option>
            <option value="price">Giá</option>
            <option value="rating">Đánh giá</option>
          </select>

          {/* Sort Order Toggle */}
          <button
            onClick={toggleSortOrder}
            className={`rounded-lg border p-2 transition-colors hover:bg-gray-50 ${
              filters.sortOrder === "desc" ? "bg-gray-100" : "bg-white"
            }`}
            title={filters.sortOrder === "asc" ? "Tăng dần" : "Giảm dần"}
          >
            <ArrowUpDown className="h-5 w-5" />
          </button>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="rounded-lg px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800"
        >
          Đặt lại
        </button>
      </div>

      {/* Error Messages */}
      <div className="mt-2">
        {priceError && <p className="text-sm text-red-500">{priceError}</p>}
        {ratingError && <p className="text-sm text-red-500">{ratingError}</p>}
      </div>

      {/* Active Filters Display */}
      <div className="mt-3 flex flex-wrap gap-2">
        {filters.search && (
          <span className="rounded-full bg-[#fff3ed] px-3 py-1 text-sm text-[#ff4800]">
            Tìm kiếm: {filters.search}
          </span>
        )}
        {(filters.priceMin || filters.priceMax) && (
          <span className="rounded-full bg-[#fff3ed] px-3 py-1 text-sm text-[#ff4800]">
            Giá: {filters.priceMin || "0"} - {filters.priceMax || "∞"}
          </span>
        )}
        {filters.minRating && (
          <span className="flex items-center gap-1 rounded-full bg-[#fff3ed] px-3 py-1 text-sm text-[#ff4800]">
            Đánh giá tối thiểu: {filters.minRating}
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </span>
        )}
        {filters.sortBy !== "" && (
          <span className="rounded-full bg-[#fff3ed] px-3 py-1 text-sm text-[#ff4800]">
            Sắp xếp theo:
            {filters.sortBy === "name"
              ? "Tên"
              : filters.sortBy === "price"
                ? "Giá"
                : "Đánh giá"}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductFilter;
