import { useState } from "react";
import { X } from "lucide-react";
import apiService from "../../../services/api";

const CreateVoucherModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    code: "",
    discountPercent: 0,
    expirationDate: "",
    quantity: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    apiService
      .postVoucher(
        formData.code,
        formData.discountPercent,
        formData.expirationDate,
        formData.quantity,
      )
      .then((res) => {
        alert("Tạo voucher thành công");
        window.location.reload();
      })
      .catch((err) => {
        alert("Tạo voucher thất bại, kiểm tra console log");
        console.log(err);
      });

    onCreate(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#ff3D00]">Tạo Voucher Mới</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <X />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="mb-2 block text-sm text-gray-600">Mã voucher</label>
          <input
            type="text"
            placeholder="Mã Voucher"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            className="mb-2 w-full rounded border p-2"
          />
          <label className="mb-2 block text-sm text-gray-600">
            Phần Trăm Giảm Giá
          </label>
          <input
            type="number"
            placeholder="Phần Trăm Giảm Giá"
            value={formData.discountPercent}
            onChange={(e) =>
              setFormData({
                ...formData,
                discountPercent: Number(e.target.value),
              })
            }
            className="mb-2 w-full rounded border p-2"
          />{" "}
          <label className="mb-2 block text-sm text-gray-600">
            Ngày Hết Hạn
          </label>
          <input
            type="date"
            placeholder="Ngày Hết Hạn"
            value={formData.expirationDate}
            onChange={(e) =>
              setFormData({ ...formData, expirationDate: e.target.value })
            }
            className="mb-2 w-full rounded border p-2"
          />
          <label className="mb-2 block text-sm text-gray-600">Số Lượng</label>
          <input
            type="number"
            placeholder="Số Lượng"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: Number(e.target.value) })
            }
            className="mb-4 w-full rounded border p-2"
          />
          <button
            type="submit"
            className="w-full rounded bg-[#ff3D00] p-2 text-white"
          >
            Tạo Voucher
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateVoucherModal;
