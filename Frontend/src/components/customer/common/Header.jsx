import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/action/authAction";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function handleClick() {
    let dropdownMenu = document.getElementById("dropdownMenu");
    if (dropdownMenu.className.includes("block")) {
      dropdownMenu.classList.add("hidden");
      dropdownMenu.classList.remove("block");
    } else {
      dropdownMenu.classList.add("block");
      dropdownMenu.classList.remove("hidden");
    }
  }

  return (
    <header className="relative z-50 flex min-h-[70px] bg-black px-4 py-4 font-sans tracking-wide shadow-md sm:px-10">
      <div className="flex w-full flex-wrap items-center justify-between gap-4">
        <Link to="/">
          <div className="flex h-[40px] w-[200px] items-end">
            <svg
              viewBox="0 0 200 70"
              className="h-full w-full"
              width="200"
              height="40"
              preserveAspectRatio="xMidYBottom meet"
            >
              <defs>
                <linearGradient
                  id="logoGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: "#FF3D00", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#FF6E40", stopOpacity: 1 }}
                  />
                </linearGradient>

                <filter
                  id="shadowEffect"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feDropShadow
                    dx="2"
                    dy="2"
                    stdDeviation="1"
                    floodColor="#FF3D00"
                    floodOpacity="0.3"
                  />
                </filter>
              </defs>

              <text
                x="50%"
                y="60%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="url(#logoGradient)"
                filter="url(#shadowEffect)"
                style={{
                  fontSize: "48px",
                  fontFamily: "Arial Black, sans-serif",
                  fontWeight: "bold",
                }}
              >
                Dom
              </text>

              <circle
                cx="30"
                cy="35"
                r="3"
                fill="#FF3D00"
                className="animate-ping"
              />
            </svg>
          </div>
        </Link>

        <div
          id="collapseMenu"
          className={`${
            isMenuOpen ? "block" : "max-lg:hidden"
          } max-lg:before:fixed max-lg:before:inset-0 max-lg:before:z-50 max-lg:before:bg-black max-lg:before:opacity-50 lg:!block`}
        >
          <button
            onClick={toggleMenu}
            className="fixed right-4 top-2 z-[100] rounded-full bg-white p-3 lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 fill-black"
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              ></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              ></path>
            </svg>
          </button>

          <ul className="z-50 gap-x-5 max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:h-full max-lg:w-1/2 max-lg:min-w-[300px] max-lg:space-y-3 max-lg:overflow-auto max-lg:bg-black max-lg:p-6 max-lg:shadow-md lg:flex">
            <li className="mb-6 hidden max-lg:block">
              <Link to="/">
                <div className="flex h-[40px] w-[200px] items-end">
                  <svg
                    viewBox="0 0 200 70"
                    className="h-full w-full"
                    width="200"
                    height="40"
                    preserveAspectRatio="xMidYBottom meet"
                  >
                    <defs>
                      <linearGradient
                        id="logoGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "#FF3D00", stopOpacity: 1 }}
                        />
                        <stop
                          offset="100%"
                          style={{ stopColor: "#FF6E40", stopOpacity: 1 }}
                        />
                      </linearGradient>

                      <filter
                        id="shadowEffect"
                        x="-20%"
                        y="-20%"
                        width="140%"
                        height="140%"
                      >
                        <feDropShadow
                          dx="2"
                          dy="2"
                          stdDeviation="1"
                          floodColor="#FF3D00"
                          floodOpacity="0.3"
                        />
                      </filter>
                    </defs>

                    <text
                      x="50%"
                      y="60%"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      fill="url(#logoGradient)"
                      filter="url(#shadowEffect)"
                      style={{
                        fontSize: "48px",
                        fontFamily: "Arial Black, sans-serif",
                        fontWeight: "bold",
                      }}
                    >
                      Dom
                    </text>

                    <circle
                      cx="30"
                      cy="35"
                      r="3"
                      fill="#FF3D00"
                      className="animate-ping"
                    />
                  </svg>
                </div>
              </Link>
            </li>
            <li className="px-3 max-lg:border-b max-lg:py-3">
              <Link
                to="/"
                className="block text-base font-bold text-white hover:text-[#ff3D00]"
                onClick={() => setIsMenuOpen(false)}
              >
                Trang chủ
              </Link>
            </li>
            <li className="px-3 max-lg:border-b max-lg:py-3">
              <Link
                to="/man?category=Giày Chạy Bộ Nam"
                className="block text-base font-bold text-white hover:text-[#ff3D00]"
                onClick={() => setIsMenuOpen(false)}
              >
                Giày Nam
              </Link>
            </li>
            <li className="px-3 max-lg:border-b max-lg:py-3">
              <Link
                to="/woman?category=Giày Chạy Bộ Nữ"
                className="block text-base font-bold text-white hover:text-[#ff3D00]"
                onClick={() => setIsMenuOpen(false)}
              >
                Giày Nữ
              </Link>
            </li>
            <li className="px-3 max-lg:border-b max-lg:py-3">
              <Link
                to="/kid?category=Giày Thể Thao Kid"
                className="block text-base font-bold text-white hover:text-[#ff3D00]"
                onClick={() => setIsMenuOpen(false)}
              >
                Giày Trẻ Em
              </Link>
            </li>
            <li className="px-3 max-lg:border-b max-lg:py-3">
              <Link
                to="/support"
                className="block text-base font-bold text-white hover:text-[#ff3D00]"
                onClick={() => setIsMenuOpen(false)}
              >
                Hỗ trợ
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-5 max-lg:ml-auto">
          <div className="relative mx-auto w-max">
            <button
              type="button"
              id="dropdownToggle"
              onClick={() => handleClick()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                className="inline cursor-pointer fill-white hover:fill-[#ff3D00]"
              >
                <circle cx="10" cy="7" r="6" />
                <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" />
              </svg>
            </button>

            {auth.isAuthenticated ? (
              <ul
                id="dropdownMenu"
                className="absolute right-0 top-[120%] z-50 hidden min-w-[200px] bg-white shadow-lg transition-all"
              >
                <li
                  className="cursor-pointer px-5 py-2.5 text-sm text-black hover:bg-[#fff3ed] hover:font-bold hover:text-[#FF3D00]"
                  onClick={() => {
                    navigate("/profile");
                    handleClick();
                  }}
                >
                  Thông tin cá nhân
                </li>
                <li
                  className="cursor-pointer px-5 py-2.5 text-sm text-black hover:bg-[#fff3ed] hover:font-bold hover:text-[#FF3D00]"
                  onClick={() => {
                    navigate("/orders");
                    handleClick();
                  }}
                >
                  Quản lý đơn hàng
                </li>
                <li
                  className="cursor-pointer px-5 py-2.5 text-sm text-black hover:bg-[#fff3ed] hover:font-bold hover:text-[#FF3D00]"
                  onClick={() => {
                    dispatch(logout());
                    handleClick();
                    navigate("/login");
                  }}
                >
                  Đăng xuất
                </li>
              </ul>
            ) : (
              <ul
                id="dropdownMenu"
                className="absolute right-0 top-[120%] z-50 hidden min-w-[200px] bg-white shadow-lg transition-all"
              >
                <li
                  className="cursor-pointer px-5 py-2.5 text-sm text-black hover:bg-[#fff3ed] hover:font-bold hover:text-[#FF3D00]"
                  onClick={() => {
                    navigate("/login");
                    handleClick();
                  }}
                >
                  Đăng nhập
                </li>
                <li
                  className="cursor-pointer px-5 py-2.5 text-sm text-black hover:bg-[#fff3ed] hover:font-bold hover:text-[#FF3D00]"
                  onClick={() => {
                    navigate("/register");
                    handleClick();
                  }}
                >
                  Đăng ký
                </li>
              </ul>
            )}
          </div>

          <span className="relative" onClick={() => navigate("/cart")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              className="inline cursor-pointer fill-white hover:fill-[#ff3D00]"
              viewBox="0 0 512 512"
            >
              <path
                d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                data-original="#000000"
              ></path>
            </svg>
          </span>

          <button onClick={toggleMenu} className="!ml-7 lg:hidden">
            <svg
              className="h-7 w-7"
              fill="white"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
