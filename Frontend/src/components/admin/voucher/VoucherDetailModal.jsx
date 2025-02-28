import { useState, useEffect } from "react";
import { X } from "lucide-react";
import apiService from "../../../services/api";

const VoucherDetailModal = ({ voucher, onClose }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    apiService
      .getVoucherStats(voucher._id)
      .then((res) => setStats(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#ff3D00]">Chi Tiết Voucher</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <X />
          </button>
        </div>
        <div className="space-y-2">
          <p>
            <strong>Mã Voucher:</strong> {voucher.code}
          </p>
          <p>
            <strong>Giảm Giá:</strong> {voucher.discountPercent}%
          </p>
          <p>
            <strong>Ngày Tạo:</strong>{" "}
            {new Date(voucher.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Ngày Hết Hạn:</strong>{" "}
            {new Date(voucher.expirationDate).toLocaleDateString()}
          </p>
          <hr />
          <p>
            <strong>Số Lượng Ban Đầu:</strong> {stats?.totalQuantity}
          </p>
          <p>
            <strong>Số Lượng Đã Dùng:</strong> {stats?.usedCount}
          </p>
          <p>
            <strong>Số Lượng Còn Lại:</strong> {stats?.remainingCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoucherDetailModal;
