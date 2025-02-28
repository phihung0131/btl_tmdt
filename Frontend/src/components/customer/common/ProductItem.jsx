import React from "react";
import StarRating from "./StarRating";

const ProductItem = ({
  image,
  name,
  price,
  description,
  rating,
  onClick,
  promotionalPrice,
}) => {
  return (
    <div
      className="relative cursor-pointer overflow-hidden rounded-lg bg-gray-50 shadow-md transition-all hover:-translate-y-2"
      onClick={onClick}
    >
      <div className="aspect-w-16 aspect-h-8 mx-auto h-[260px] w-5/6 overflow-hidden p-4">
        <img src={image} alt={name} className="h-full w-full object-contain" />
      </div>

      <div className="bg-white p-6">
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        <div className="mt-2 flex items-center gap-2">
          {promotionalPrice ? (
            <>
              <h4 className="text-lg font-bold text-[#FF3D00]">
                {promotionalPrice}₫
              </h4>
              <h4 className="text-sm text-gray-500 line-through">{price}₫</h4>
            </>
          ) : (
            <h4 className="text-lg font-bold text-gray-800">{price}₫</h4>
          )}
        </div>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        <div className="mt-4">
          <StarRating rating={rating} />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
