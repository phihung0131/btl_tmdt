// Utility Functions
const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

// Order Status Component
const OrderStatus = ({ statusBreakdown }) => (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold">Trạng thái đơn hàng</h2>
      <div className="space-y-4">
        {statusBreakdown?.map((status) => (
          <div key={status._id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{status._id}</p>
              <p className="text-sm text-gray-500">
                {formatCurrency(status.averageValue)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-orange-100 px-3 py-1">
                <span className="text-[#FF3D00]">{status.count}</span>
              </div>
              <div className="h-2 w-24 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-[#FF3D00]"
                  style={{
                    width: `${(status.count / statusBreakdown.reduce((acc, curr) => acc + curr.count, 0)) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  export default OrderStatus;