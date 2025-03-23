import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import apiService from "../services/api";
import Header from "../components/customer/common/Header";
import Footer from "../components/customer/common/Footer";
import NavList from "../components/customer/products/NavList";
import ProductFilter from "../components/customer/products/ProductFilter";
import ProductList from "../components/customer/common/ProductList";
import Pagination from "../components/customer/products/Pagination";

const Products = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [navItems, setNavItems] = useState([]);
  const [activeItem, setActiveItem] = useState("");

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Tiệm Giày DOM | Sản phẩm";
    switch (location.pathname) {
      case "/products":
        break;
      case "/man":
        document.title = "Tiệm Giày DOM | Giày Nam";
        setNavItems(
          [
            { title: "Giày Chạy Bộ Nam" },
            { title: "Giày Cầu Lông Nam" },
            { title: "Giày Tây Nam" },
            { title: "Giày Đá Bóng Nam" },
            { title: "Sandal Nam" },
          ].map((item) => ({
            ...item,
            onClick: () => {
              navigate("/man?category=" + item.title);
            },
          })),
        );
        break;
      case "/woman":
        document.title = "Tiệm Giày DOM | Giày Nữ";
        setNavItems(
          [
            { title: "Giày Chạy Bộ Nữ" },
            { title: "Giày Cầu Lông Nữ" },
            { title: "Giày Cao Gót Nữ" },
            { title: "Giày Búp Bê Nữ" },
            { title: "Sandal Nữ" },
            { title: "Boot Nữ" },
          ].map((item) => ({
            ...item,
            onClick: () => {
              navigate("/woman?category=" + item.title);
            },
          })),
        );
        break;
      case "/kid":
        document.title = "Tiệm Giày DOM | Giày Trẻ Em";
        setNavItems(
          [
            { title: "Giày Thể Thao Kid" },
            { title: "Sandal Kid" },
            { title: "Dép Kid" },
          ].map((item) => ({
            ...item,
            onClick: () => {
              navigate("/kid?category=" + item.title);
            },
          })),
        );
        break;
    }

    setActiveItem(searchParams.get("category"));
    apiService
      .getSearchProducts(
        1,
        12,
        "",
        searchParams.get("category"),
        "",
        "",
        "desc",
      )
      .then((res) => {
        setProducts(res?.data?.data?.products);
        setCurrentPage(res?.data?.data?.currentPage);
        setTotalPages(res?.data?.data?.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location.pathname]);

  useEffect(() => {
    setActiveItem(searchParams.get("category"));
    apiService
      .getSearchProducts(1, 12, "", searchParams.get("category"))
      .then((res) => {
        console.log(res);
        setProducts(res?.data?.data?.products);
        setCurrentPage(res?.data?.data?.currentPage);
        setTotalPages(res?.data?.data?.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchParams]);

  return (
    <div className="static mt-[72px]">
      <div className="mx-auto px-4 pb-6 pt-10 sm:max-w-full sm:px-6 lg:max-w-7xl lg:px-8">
        <NavList items={navItems} activeItem={activeItem} />
        <ProductFilter
          activeItem={activeItem}
          setProducts={setProducts}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setTotalPages={setTotalPages}
        />
        <ProductList products={products} api="searchProducts" />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      <Footer />

      <div className="fixed left-0 top-0 w-full">
        <Header />
      </div>
    </div>
  );
};

export default Products;
