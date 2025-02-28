import React, { useState, useEffect } from "react";
import { Trash2, Edit, Eye, Plus } from "lucide-react";
import { useSelector } from "react-redux";

import CreateVoucherModal from "../../components/admin/voucher/CreateVoucherModal";
import EditVoucherModal from "../../components/admin/voucher/EditVoucherModal";
import VoucherDetailModal from "../../components/admin/voucher/VoucherDetailModal";
import apiService from "../../services/api";

const AdminVoucher = () => {
  const auth = useSelector((state) => state.auth);
  const [vouchers, setVouchers] = useState([]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentVoucher, setCurrentVoucher] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleCreateVoucher = (newVoucher) => {
    setVouchers([...vouchers, { ...newVoucher, _id: Date.now().toString() }]);
    setIsCreateModalOpen(false);
  };

  const handleEditVoucher = (updatedVoucher) => {
    const updatedVouchers = vouchers.map((v) =>
      v._id === currentVoucher._id ? { ...v, ...updatedVoucher } : v,
    );
    setVouchers(updatedVouchers);
    setIsEditModalOpen(false);
  };

  const handleDeleteVoucher = (id) => {
    apiService
      .deleteVoucher(id)
      .then(() => {
        alert("Xóa Voucher Thành Công");
      })
      .catch((err) => {
        console.log(err);
        alert("Xóa Voucher Thất Bại, kiểm tra console log");
      });
    setVouchers(vouchers.filter((v) => v._id !== id));
  };

  const handleDeleteExpiredVouchers = () => {
    apiService
      .postDeactivateExpired()
      .then(() => {
        alert("Xóa Voucher Hết Hạn Thành Công");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("Xóa Voucher Hết Hạn Thất Bại, kiểm tra console log");
      });
  };

  const paginatedVouchers = vouchers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(vouchers.length / itemsPerPage);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Quản Lý Voucher";

    apiService
      .getVouchers()
      .then((res) => setVouchers(res.data.data.vouchers))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen border-b bg-white p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-bold text-[#FF3D00] md:mb-6 md:text-2xl">
          Quản Lý Voucher
        </h1>
        <div className="flex space-x-2">
          {auth.role === "OWNER" && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center rounded bg-[#ff3D00] p-2 text-white"
            >
              <Plus className="mr-2" /> Tạo Voucher
            </button>
          )}
          <button
            onClick={handleDeleteExpiredVouchers}
            className="flex items-center rounded bg-red-600 p-2 text-white"
          >
            <Trash2 className="mr-2" /> Xóa Voucher Hết Hạn
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full rounded bg-white shadow-md">
          <thead className="bg-[#ff3D00] text-white">
            <tr>
              <th className="p-3 text-left">Mã Voucher</th>
              <th className="p-3 text-left">Giảm Giá</th>
              <th className="p-3 text-left">Ngày Hết Hạn</th>
              <th className="p-3 text-left">Số Lượng</th>
              <th className="p-3 text-center">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {paginatedVouchers.map((voucher) => (
              <tr key={voucher._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{voucher.code}</td>
                <td className="p-3">{voucher.discountPercent}%</td>
                <td className="p-3">
                  {new Date(voucher.expirationDate).toLocaleDateString()}
                </td>
                <td className="p-3">{voucher.quantity}</td>
                <td className="flex justify-center space-x-2 p-3">
                  <button
                    onClick={() => {
                      setCurrentVoucher(voucher);
                      setIsDetailModalOpen(true);
                    }}
                    className="rounded p-1 text-blue-600 hover:bg-blue-100"
                  >
                    <Eye />
                  </button>
                  {auth.role === "OWNER" && (
                    <>
                      <button
                        onClick={() => {
                          setCurrentVoucher(voucher);
                          setIsEditModalOpen(true);
                        }}
                        className="rounded p-1 text-green-600 hover:bg-green-100"
                      >
                        <Edit />
                      </button>

                      <button
                        onClick={() => handleDeleteVoucher(voucher._id)}
                        className="rounded p-1 text-red-600 hover:bg-red-100"
                      >
                        <Trash2 />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`rounded px-4 py-2 ${
              currentPage === index + 1
                ? "bg-[#ff3D00] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {isCreateModalOpen && (
        <CreateVoucherModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateVoucher}
        />
      )}

      {isEditModalOpen && (
        <EditVoucherModal
          voucher={currentVoucher}
          onClose={() => setIsEditModalOpen(false)}
          onEdit={handleEditVoucher}
        />
      )}

      {isDetailModalOpen && (
        <VoucherDetailModal
          voucher={currentVoucher}
          onClose={() => setIsDetailModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminVoucher;
