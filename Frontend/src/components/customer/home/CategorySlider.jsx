import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CategorySlider = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const categories = [
    {
      name: "Giày chạy bộ",
      image:
        "https://zocker.vn/pic/Product/giay-chay-bo-zocker-ultra-light-xanh-den-2_2880_HasThumb_Thumb.webp",
    },
    {
      name: "Giày cầu lông",
      image:
        "https://product.hstatic.net/200000333667/product/z5439128163323_8252497ca3f2b955f735454de9b51ef4_e8a184013a3b40668b53c160cf1d4f6e_master.jpg",
    },
    {
      name: "Giày tây",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbKtfWVgOy1ETP7S0dHkMU8bm1OTp1LAHutQ&s",
    },
    {
      name: "Giày đá bóng",
      image:
        "https://thethaominhphu.com/wp-content/uploads/2017/12/giay-bong-da-puma-xanh-chuoi.jpg",
    },
    {
      name: "Sandal",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQseoDywZCotTWOwFrU9exF7ewsWtAvQ4HW2g&s",
    },
    {
      name: "Giày cao gót",
      image:
        "https://down-vn.img.susercontent.com/file/982925c562f1962a8fe7e17aa9f9f285",
    },
    {
      name: "Giày búp bê",
      image: "https://cdn1.concung.com/storage/2022/10/1666258495.png",
    },
    {
      name: "Boot",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUzWNed05RfgwCU67lkWh6ZDqqvWeVlgOsiQ&s",
    },
    {
      name: "Giày thể thao",
      image:
        "https://down-vn.img.susercontent.com/file/ab598875a876f58e66efac3cddb976ab",
    },
    {
      name: "Dép",
      image:
        "https://thek2deluxe.com/wp-content/uploads/2020/04/dep-gucci-con-ho-3_optimized.jpg",
    },
  ];

  const scrollLeft = () => {
    const slider = document.getElementById("slider");
    if (slider) {
      slider.scrollBy({ left: -200, behavior: "smooth" });
      setScrollPosition(slider.scrollLeft - 200);
    }
  };

  const scrollRight = () => {
    const slider = document.getElementById("slider");
    if (slider) {
      slider.scrollBy({ left: 200, behavior: "smooth" });
      setScrollPosition(slider.scrollLeft + 200);
    }
  };

  return (
    <div className="mx-auto px-4 pt-10 sm:max-w-full sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="mb-4 text-4xl font-extrabold text-gray-800">
        Dòng sản phẩm
      </h2>
      {/* Category Slider */}
      <div className="relative w-full">
        {/* Navigation Buttons */}
        <button
          onClick={scrollLeft}
          className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-all hover:bg-white sm:left-0"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={scrollRight}
          className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-all hover:bg-white sm:right-0"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slider Container */}
        <div
          id="slider"
          className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth px-4 py-8 sm:px-6 md:gap-6"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className="group w-28 flex-none cursor-pointer sm:w-32 md:w-40 lg:w-48"
            >
              <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="text-center text-sm font-medium text-gray-800 transition-colors group-hover:text-[#FF3D00] sm:text-base">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;
