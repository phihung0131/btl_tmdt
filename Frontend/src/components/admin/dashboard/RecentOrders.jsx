// Utility Functions
const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  
  const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("vi-VN");
};

// Recent Orders Component
const RecentOrders = ({ orders }) => (
  <div className="rounded-lg bg-white p-6 shadow-md">
    <h2 className="mb-4 text-lg font-semibold">Đơn hàng gần đây</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Mã đơn
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Khách hàng
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Giá trị
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Ngày đặt
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {order._id.slice(-6)}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm text-gray-900">{order.name}</div>
                <div className="text-sm text-gray-500">{order.phone}</div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {formatCurrency(order.totalPrice)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {formatDate(order.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RecentOrders;
