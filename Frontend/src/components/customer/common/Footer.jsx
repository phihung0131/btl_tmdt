import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#213343] px-10 py-10 font-sans tracking-wide">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h4 className="mb-6 text-lg font-semibold text-[#FFA726]">
            Về chúng tôi
          </h4>
          <ul className="space-y-5">
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Câu chuyện của DOM
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Tin tức
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Tuyển dụng
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Bài viết
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 text-lg font-semibold text-[#FFA726]">
            Sản phẩm
          </h4>
          <ul className="space-y-5">
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Giày Nam
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Giày Nữ
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Giày Trẻ Em
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Phụ kiện giày
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 text-lg font-semibold text-[#FFA726]">
            Chính sách
          </h4>
          <ul className="space-y-5">
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Chính sách đổi trả
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Chính sách bảo hành
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Chính sách vận chuyển
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Hướng dẫn thanh toán
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 text-lg font-semibold text-[#FFA726]">Liên hệ</h4>
          <ul className="space-y-5">
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Hỗ trợ khách hàng
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Cửa hàng
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Liên hệ
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                FAQs
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-[#6b5f5f] pt-8 text-center">
        <p className="text-[15px] text-gray-300">
          © Tiệm Giày DOM. Tất cả quyền được bảo lưu.
        </p>
      </div>
    </footer>
  );
};

export default Footer;