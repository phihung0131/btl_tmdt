import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/customer/common/Header";
import Footer from "../components/customer/common/Footer";
import apiService from "../services/api";
const Register = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowError, setIsShowError] = useState(false);
  const [errorMess, setErrorMess] = useState(
    "Đăng nhập thất bại, vui lòng kiểm tra lại thông tin",
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Tiệm Giày DOM | Đăng ký";
  }, []);

  const handleRegister = () => {
    if (!username || !password || !name || !address || !email) {
      setErrorMess("Vui lòng nhập đầy đủ thông tin");
      setIsShowError(true);
      return;
    }
    apiService
      .register(username, password, name, address, email)
      .then((res) => {
        const redirectUrl = res.data.redirectUrl || res.request.responseURL;
        window.location.href = redirectUrl;
      })
      .catch((err) => {
        setErrorMess(err?.response?.data?.data?.error);
        setIsShowError(true);
      });
  };

  const handleGoogleRegister = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };

  const handleFacebookRegister = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/facebook`;
  };
  return (
    <>
      <Header />
      <div className="flex min-h-[80vh] flex-col items-center justify-center">
        <div className="m-4 grid w-full max-w-6xl items-center gap-4 rounded-md p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] max-md:max-w-lg max-md:gap-8 md:grid-cols-2">
          <div className="w-full px-4 py-4 md:max-w-md">
            <form>
              <div className="mb-12">
                <h3 className="text-3xl font-extrabold text-gray-800">
                  Đăng ký
                </h3>
                <p className="mt-4 text-sm text-gray-800">
                  Bạn đã có tài khoản?
                  <Link
                    to="/login"
                    className="ml-1 whitespace-nowrap font-semibold text-[#FF3D00] hover:underline"
                  >
                    Đăng nhập
                  </Link>
                </p>
              </div>

              <div>
                <label className="mb-2 block text-xs text-gray-800">
                  Họ tên
                </label>
                <div className="relative flex items-center">
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full border-b border-gray-300 px-2 py-3 text-sm text-gray-800 outline-none focus:border-[#FF3D00]"
                    placeholder="Nhập họ và tên"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-8">
                <label className="mb-2 block text-xs text-gray-800">
                  Địa chỉ
                </label>
                <div className="relative flex items-center">
                  <input
                    name="address"
                    type="text"
                    required
                    className="w-full border-b border-gray-300 px-2 py-3 text-sm text-gray-800 outline-none focus:border-[#FF3D00]"
                    placeholder="Nhập địa chỉ"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-8">
                <label className="mb-2 block text-xs text-gray-800">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="email"
                    required
                    className="w-full border-b border-gray-300 px-2 py-3 text-sm text-gray-800 outline-none focus:border-[#FF3D00]"
                    placeholder="Nhập email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-8">
                <label className="mb-2 block text-xs text-gray-800">
                  Username
                </label>
                <div className="relative flex items-center">
                  <input
                    name="username"
                    type="text"
                    required
                    className="w-full border-b border-gray-300 px-2 py-3 text-sm text-gray-800 outline-none focus:border-[#FF3D00]"
                    placeholder="Nhập username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-8">
                <label className="mb-2 block text-xs text-gray-800">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={isShowPassword ? "text" : "password"}
                    required
                    className="w-full border-b border-gray-300 px-2 py-3 text-sm text-gray-800 outline-none focus:border-[#FF3D00]"
                    placeholder="Nhập password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#FF3D00"
                    stroke="#FF3D00"
                    className="absolute right-2 h-[18px] w-[18px] cursor-pointer"
                    viewBox="0 0 128 128"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>

              {isShowError && (
                <div className="mt-4 rounded-md bg-red-100 p-2 text-red-600">
                  {errorMess}
                </div>
              )}

              <div className="mt-12">
                <button
                  type="button"
                  className="w-full rounded-md bg-[#FF3D00] px-4 py-2.5 text-sm tracking-wide text-white shadow-xl hover:bg-[#ff1100f5] focus:outline-none"
                  onClick={() => handleRegister(username, password)}
                >
                  Đăng ký
                </button>
              </div>

              <hr className="my-6 border-t border-[#FF3D00]" />

              <div className="mt-6 flex justify-center space-x-6">
                <button
                  type="button"
                  className="border-none outline-none"
                  onClick={() => handleGoogleRegister()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32px"
                    className="inline"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#fbbd00"
                      d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                      data-original="#fbbd00"
                    />
                    <path
                      fill="#0f9d58"
                      d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                      data-original="#0f9d58"
                    />
                    <path
                      fill="#31aa52"
                      d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                      data-original="#31aa52"
                    />
                    <path
                      fill="#3c79e6"
                      d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                      data-original="#3c79e6"
                    />
                    <path
                      fill="#cf2d48"
                      d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                      data-original="#cf2d48"
                    />
                    <path
                      fill="#eb4132"
                      d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                      data-original="#eb4132"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="border-none outline-none"
                  onClick={() => handleFacebookRegister()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32px"
                    fill="#007bff"
                    viewBox="0 0 167.657 167.657"
                  >
                    <path
                      d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z"
                      data-original="#010002"
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>

          <div className="bg-[#000842] md:h-full">
            <img
              src="https://file.hstatic.net/1000230642/file/1000_x_1157_-_hunter_nu.jpg"
              className="h-full w-full object-contain"
              alt="register-image"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
