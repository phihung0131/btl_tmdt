import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import apiService from "../services/api";
import { loginSuccess } from "../redux/action/authAction";

const AuthHandler = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Lấy token từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Lưu token vào localStorage hoặc xử lý khác
      console.log("Token:", token);
      apiService.getProfile(token).then((res) => {
        const profile = res?.data?.data?.user;
        profile.token = token;
        profile.isAuthenticated = true;
        console.log("Profile:", profile);
        dispatch(loginSuccess(profile));

        if (profile.role === "ADMIN" || profile.role === "OWNER") {
          navigate("/admin");
        }
      });

      //   Điều hướng tới trang chính hoặc nơi cần thiết
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Đang xử lý xác thực...</h1>
    </div>
  );
};

export default AuthHandler;
