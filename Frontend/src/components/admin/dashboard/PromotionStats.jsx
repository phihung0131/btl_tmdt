// Promotion Stats Component
const PromotionStats = ({ promotionData }) => (
  <div className="rounded-lg bg-white p-6 shadow-md">
    <h2 className="mb-4 text-lg font-semibold">Thống kê khuyến mãi</h2>
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-lg bg-orange-50 p-4 text-center">
        <p className="text-2xl font-bold text-[#FF3D00]">
          {promotionData && promotionData["Tong So Khuyen Mai "]}
        </p>
        <p className="text-sm text-gray-500">Tổng số khuyến mãi</p>
      </div>
      <div className="rounded-lg bg-orange-50 p-4 text-center">
        <p className="text-2xl font-bold text-[#FF3D00]">
          {promotionData && promotionData["So Khuyen mai duoc su dung"]}
        </p>
        <p className="text-sm text-gray-500">Đã sử dụng</p>
      </div>
      <div className="rounded-lg bg-orange-50 p-4 text-center">
        <p className="text-2xl font-bold text-[#FF3D00]">
          {promotionData &&
            promotionData["So san pham da ban duoc co khuyen mai"]}
        </p>
        <p className="text-sm text-gray-500">Sản phẩm đã bán</p>
      </div>
    </div>
    <div className="space-y-3">
      <h3 className="font-medium">Chi tiết khuyến mãi</h3>
      {promotionData?.Chi_tiet?.map((promo, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
        >
          <span>{promo.name}</span>
          <span
            className={`rounded-full px-2 py-1 text-sm ${promo.DuocSuDung ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
          >
            {promo.DuocSuDung ? "Đã sử dụng" : "Chưa sử dụng"}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default PromotionStats;
