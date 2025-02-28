import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import apiService from "../services/api";
import Header from "../components/customer/common/Header";
import Footer from "../components/customer/common/Footer";
import ProductView from "../components/customer/product/ProductView";
import { addToListSeenProducts } from "../redux/action/productAction";
const Product = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [productInfo, setProductInfo] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    apiService
      .getAProduct(id)
      .then((res) => {
        setProductInfo(res.data.data);
        console.log(res.data.data);
        dispatch(addToListSeenProducts(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <>
      <Header />
      <ProductView productInfo={productInfo} />
      <Footer />
    </>
  );
};

export default Product;
