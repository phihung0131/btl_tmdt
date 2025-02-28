import React from "react";
import { Link } from "react-router-dom";
const HomeBanner = () => {
  return (
    <section className="relative bg-[url(https://file.hstatic.net/1000230642/file/1920_x_1080_static_dau_trang.jpg)] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center sm:text-left"> {/* Modified here */}
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            Bước chân phong cách
            <strong className="block font-extrabold text-[#FF3D00]">
              Dẫn lối thành công.
            </strong>
          </h1>

          <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
            Khám phá bộ sưu tập giày đa phong cách, từ thể thao năng động đến
            lịch lãm thời thượng, giúp bạn tự tin sải bước trên mọi hành trình.
          </p>

          <div className="mt-8 flex w-full flex-wrap items-center sm:justify-start justify-center gap-4"> {/* Modified here */}
            <Link
              to="/products"
              className="block w-full rounded bg-[#FF3D00] px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#d6622dfa] focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
            >
              Khám phá ngay
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;