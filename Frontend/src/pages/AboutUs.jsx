// src/pages/AboutUs.jsx
import React, { useEffect } from "react";
import Header from "../components/customer/common/Header";
import Footer from "../components/customer/common/Footer";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Tiệm Giày DOM | Về chúng tôi";
  }, []);

  return (
    <div className="static mt-[72px]">
      <div className="mx-auto max-w-6xl p-6">
        {/* Banner Section */}
        <div className="mb-12 overflow-hidden rounded-xl bg-[url('https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center py-20 text-center">
          <div className="bg-black bg-opacity-50 p-8">
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Câu chuyện của DOM</h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-200">
              Từ một cửa hàng nhỏ đến thương hiệu giày hàng đầu Việt Nam
            </p>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-[#FF3D00]">Câu Chuyện Của Chúng Tôi</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-gray-700">
                Tiệm Giày DOM được thành lập vào năm 2015 với niềm đam mê mang đến những đôi giày chất lượng, phong cách và thoải mái cho người Việt Nam. Chúng tôi bắt đầu từ một cửa hàng nhỏ ở Hà Nội với đội ngũ chỉ 5 người, nhưng với tâm huyết và sự tận tâm, chúng tôi đã phát triển thành một trong những thương hiệu giày hàng đầu tại Việt Nam.
              </p>
              <p className="text-gray-700">
                Sứ mệnh của chúng tôi là đơn giản: cung cấp sản phẩm chất lượng với giá thành hợp lý, cùng dịch vụ khách hàng xuất sắc. Chúng tôi tin rằng mỗi bước đi đều quan trọng, và một đôi giày phù hợp có thể thay đổi cả ngày của bạn.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Tiệm giày DOM"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-[#FF3D00]">Giá Trị Của Chúng Tôi</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg p-6 shadow-lg transition-transform hover:-translate-y-2">
              <div className="mb-4 text-center text-4xl text-[#FFA726]">
                <i className="fas fa-heart"></i>
              </div>
              <h3 className="mb-3 text-center text-xl font-bold">Chất Lượng</h3>
              <p className="text-center text-gray-600">
                Chúng tôi cam kết cung cấp sản phẩm chất lượng cao, sử dụng nguyên liệu tốt nhất và quy trình sản xuất nghiêm ngặt.
              </p>
            </div>
            
            <div className="rounded-lg p-6 shadow-lg transition-transform hover:-translate-y-2">
              <div className="mb-4 text-center text-4xl text-[#FFA726]">
                <i className="fas fa-handshake"></i>
              </div>
              <h3 className="mb-3 text-center text-xl font-bold">Dịch Vụ</h3>
              <p className="text-center text-gray-600">
                Khách hàng luôn là ưu tiên hàng đầu. Chúng tôi không chỉ bán giày, chúng tôi mang đến trải nghiệm mua sắm tuyệt vời.
              </p>
            </div>
            
            <div className="rounded-lg p-6 shadow-lg transition-transform hover:-translate-y-2">
              <div className="mb-4 text-center text-4xl text-[#FFA726]">
                <i className="fas fa-leaf"></i>
              </div>
              <h3 className="mb-3 text-center text-xl font-bold">Bền Vững</h3>
              <p className="text-center text-gray-600">
                Chúng tôi cam kết giảm thiểu tác động đến môi trường thông qua các nguyên liệu và quy trình sản xuất bền vững.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-[#FF3D00]">Đội Ngũ Của Chúng Tôi</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mb-4 overflow-hidden rounded-full">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="CEO" 
                  className="mx-auto h-40 w-40 object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Nguyễn Văn A</h3>
              <p className="text-[#FF3D00]">Nhà sáng lập & CEO</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 overflow-hidden rounded-full">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="Design Director" 
                  className="mx-auto h-40 w-40 object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Trần Thị B</h3>
              <p className="text-[#FF3D00]">Giám đốc thiết kế</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 overflow-hidden rounded-full">
                <img 
                  src="https://randomuser.me/api/portraits/men/67.jpg" 
                  alt="Marketing Manager" 
                  className="mx-auto h-40 w-40 object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Phạm Văn C</h3>
              <p className="text-[#FF3D00]">Giám đốc marketing</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 overflow-hidden rounded-full">
                <img 
                  src="https://randomuser.me/api/portraits/women/33.jpg" 
                  alt="Customer Service Manager" 
                  className="mx-auto h-40 w-40 object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Lê Thị D</h3>
              <p className="text-[#FF3D00]">Quản lý CSKH</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="rounded-lg bg-gray-100 p-8">
          <h2 className="mb-6 text-center text-3xl font-bold text-[#FF3D00]">Liên Hệ Với Chúng Tôi</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-gray-700">
                Chúng tôi luôn sẵn lòng lắng nghe ý kiến và cải thiện dịch vụ. Hãy liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi hay phản hồi nào.
              </p>
              <div className="space-y-3 text-gray-700">
                <p><strong>Địa chỉ:</strong> 123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</p>
                <p><strong>Điện thoại:</strong> (84) 123-456-789</p>
                <p><strong>Email:</strong> contact@tiemgiaydom.com</p>
                <p><strong>Giờ làm việc:</strong> 8:00 - 21:00, Thứ Hai - Chủ Nhật</p>
              </div>
            </div>
            <div>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.252080182328!2d106.69237227460264!3d10.790337289318513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528b166e68ac5%3A0xd678c7e58bb590e9!2zMjQgUGjDuW5nIEtoxrDhu5tuZyAzLCBUw6JuIMSQ4buLbmgsIFF14bqtbiAxLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1710497456356!5m2!1svi!2s"
                width="100%" 
                height="300" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <div className="fixed left-0 top-0 w-full">
        <Header />
      </div>
    </div>
  );
};

export default AboutUs;