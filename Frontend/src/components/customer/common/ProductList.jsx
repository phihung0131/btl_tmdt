import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductItem from "./ProductItem";
import apiService from "../../../services/api";

const ProductList = (props) => {
  const navigate = useNavigate();

  const seenProducts = useSelector((state) => state.products);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    switch (props.api) {
      case "getProducs":
        apiService
          .getSearchProducts(1, 8, "", "", "", "", "desc")
          .then((res) => {
            setProducts(res?.data?.data?.products);
          })
          .catch((err) => {
            console.log("ERROR: ", err);
          });
        break;
      case "getPromotionProducts":
        apiService
          .getPromotionProducts(1, 8)
          .then((res) => {
            setProducts(res?.data?.data?.products);
          })
          .catch((err) => {
            console.log("ERROR: ", err);
          });

        break;
      case "searchProducts":
        setProducts(props.products);
        break;
      case "seenProducts":
        // console.log("seenProducts: ", seenProducts);
        setProducts(seenProducts.products);
        break;
      default:
        break;
    }
  }, [props.products]);

  // useEffect(() => {
  //   console.log("props.products: ", products);
  // }, [products]);

  return (
    <>
      <div className="mx-auto px-4 pb-6 pt-10 sm:max-w-full sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="mb-12 text-4xl font-extrabold text-gray-800">
          {props.nameList}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products?.map((product, index) => (
            <ProductItem
              key={index}
              image={product.imageUrl[0]}
              name={product.name}
              price={product.price}
              description={`Màu: ${product.totalColors} - Size: ${product.totalSizes}`}
              rating={product.totalRate}
              promotionalPrice={product?.promotionalPrice}
              onClick={() => navigate(`/products/${product._id}`)}
            />
          ))}
          {products?.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <svg
                className="mb-4 h-24 w-24 animate-pulse text-[#FF3D00]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <h3 className="mb-2 text-xl font-semibold text-[#FF3D00]">
                Không tìm thấy sản phẩm
              </h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
