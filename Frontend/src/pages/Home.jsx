import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/customer/common/Header";
import HomeBanner from "../components/customer/home/HomeBanner";
import CategorySlider from "../components/customer/home/CategorySlider";
import ProductList from "../components/customer/common/ProductList";
import Footer from "../components/customer/common/Footer";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Tiệm Giày Đóm | Trang chủ";

  }, []);

  return (
    <div className="static">
      <HomeBanner />
      <hr></hr>
      <CategorySlider />

      <ProductList nameList="Sản phẩm mới" api="getProducs" />
      <Link
        to="/products"
        className="block w-full py-4 text-center font-semibold text-[#FF3D00]"
      >
        Xem thêm
      </Link>

      <ProductList nameList="Sản phẩm khuyến mãi" api="getPromotionProducts" />
      <Link
        to="/products"
        className="block w-full py-4 text-center font-semibold text-[#FF3D00]"
      >
        Xem thêm
      </Link>

      <ProductList nameList="Sản phẩm bạn đã xem" api="seenProducts" />

      <Footer />
      <div className="fixed left-0 top-0 w-full">
        <Header />
      </div>
    </div>
  );
};

export default Home;
