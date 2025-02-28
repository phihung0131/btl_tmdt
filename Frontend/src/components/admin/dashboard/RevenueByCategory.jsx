// Utility Functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

// Revenue By Category Component
const RevenueByCategory = ({ revenueByCategory }) => (
  <div className="rounded-lg bg-white p-6 shadow-md">
    <h2 className="mb-4 text-lg font-semibold">Doanh thu theo danh mục</h2>
    <div className="space-y-4">
      {revenueByCategory.map((category) => (
        <div key={category._id} className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">{category.name}</span>
            <span>{formatCurrency(category.totalRevenue)}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-[#FF3D00]"
              style={{
                width: `${(category.totalRevenue / Math.max(...revenueByCategory.map((c) => c.totalRevenue))) * 100}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RevenueByCategory;
