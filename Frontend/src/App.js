import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import AuthHandler from "./pages/AuthHandler";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Support from "./pages/Support";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import OrdersList from "./pages/OrdersList";
import OrderDetail from "./pages/OrderDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./components/layout/AdminLayout";
import AdminOrder from "./pages/admin/AdminOrder";
import AdminProduct from "./pages/admin/AdminProduct";
import AdminSupport from "./pages/admin/AdminSupport";
import AdminVoucher from "./pages/admin/AdminVoucher";
import AdminPromotion from "./pages/admin/AdminPromotion";
import AdminUser from "./pages/admin/AdminUser";
import AdminOrderDetail from "./pages/admin/AdminOrderDetail";
import AdminProductDetail from "./pages/admin/AdminProductDetail";

export default function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/man" element={<Products />} />
        <Route path="/woman" element={<Products />} />
        <Route path="/kid" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/auth" element={<AuthHandler />} />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/support"
          element={isAuthenticated ? <Support /> : <Navigate to="/login" />}
        />
        <Route
          path="/Cart"
          element={isAuthenticated ? <Cart /> : <Navigate to="/login" />}
        />
        <Route path="/products/:id" element={<Product />} />
        <Route
          path="/orders"
          element={isAuthenticated ? <OrdersList /> : <Navigate to="/login" />}
        />
        <Route
          path="/orders/:id"
          element={isAuthenticated ? <OrderDetail /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin"
          element={
            role === "ADMIN" || role === "OWNER" ? (
              <AdminLayout />
            ) : (
              <Navigate to="/" />
            )
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrder />} />
          <Route path="orders/:id" element={<AdminOrderDetail />} />
          <Route path="products" element={<AdminProduct />} />
          <Route path="products/:id" element={<AdminProductDetail />} />
          <Route path="support" element={<AdminSupport />} />
          <Route path="vouchers" element={<AdminVoucher />} />
          <Route path="promotions" element={<AdminPromotion />} />
          <Route
            path="users"
            element={
              role === "OWNER" ? (
                <AdminUser />
              ) : (
                <Navigate to="/admin/dashboard" />
              )
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
