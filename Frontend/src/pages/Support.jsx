import React, { useEffect, useState } from "react";
import { Edit2, Trash2, Plus, X } from "lucide-react";
import Header from "../components/customer/common/Header";
import Footer from "../components/customer/common/Footer";
import apiService from "../services/api";
const ITEMS_PER_PAGE = 5;

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const Support = () => {
  const [tickets, setTickets] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [editingTicket, setEditingTicket] = useState({});
  const [newTicket, setNewTicket] = useState({ subject: "", description: "" });
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);

  const totalPages = Math.ceil(tickets?.data?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTickets = tickets?.data?.slice(startIndex, endIndex);

  const handleDelete = () => {
    if (!ticketToDelete) return;
    apiService
      .deleteSupportTicket(ticketToDelete)
      .then((res) => {
        alert(res?.data?.message);
      })
      .catch((err) => {
        console.error(err);
      });
    setTickets((prev) => ({}));
    setIsDeleteModalOpen(false);
    setTicketToDelete(null);
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    setIsEditModalOpen(true);
  };

  const handleUpdate = () => {
    if (!editingTicket) return;

    apiService
      .putSupportTicket(
        editingTicket._id,
        editingTicket.subject,
        editingTicket.description,
      )
      .then((res) => {
        alert(res?.data?.message);
      })
      .catch((err) => {
        console.error(err);
      });
    setIsEditModalOpen(false);
    setEditingTicket(null);
    setTickets({});
  };

  const handleCreate = () => {
    apiService
      .postSupportTicket(newTicket.subject, newTicket.description)
      .then((res) => {
        alert(res?.data?.message);
      })
      .catch((err) => {
        console.error(err);
      });

    setTickets((prev) => ({}));

    setNewTicket({ subject: "", description: "" });
    setIsNewTicketModalOpen(false);
  };

  useEffect(() => {
    document.title = "Tiệm Giày Đóm | Hỗ Trợ";
    apiService
      .getSupportTickers()
      .then((res) => {
        setTickets(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [tickets]);

  return (
    <div className="static mt-[72px]">
      <div className="mx-auto min-h-[80vh] max-w-6xl p-4">
        <div className="rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-xl font-bold">Support Tickets</h2>
            <button
              onClick={() => setIsNewTicketModalOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-[#FF3D00] px-4 py-2 text-white transition-colors hover:bg-[#FF3D00]/90"
            >
              <Plus size={20} />
              Tạo Ticket Mới
            </button>
          </div>

          <div className="space-y-4 p-4">
            {currentTickets?.map((ticket) => (
              <div
                key={ticket._id}
                className="rounded-lg border p-4 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{ticket.subject}</h3>
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          ticket.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {ticket.description}
                    </p>

                    <p className="text-xs text-gray-400">
                      Tạo lúc: {new Date(ticket.createdAt).toLocaleDateString()}
                    </p>
                    <div className="mb-4">
                      {ticket.respond && (
                        <div className="flex justify-start">
                          <div className="w-full rounded-lg bg-[#fff1ec] px-4 py-2">
                            <p className="text-sm text-gray-800">
                              {ticket.respond}
                            </p>
                            <span className="mt-1 block text-xs text-gray-500">
                              {new Date(ticket.updatedAt).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {!ticket.respond && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(ticket)}
                        className="rounded-full p-2 transition-colors hover:bg-gray-100"
                      >
                        <Edit2 size={18} className="text-[#FF3D00]" />
                      </button>
                      <button
                        onClick={() => {
                          setTicketToDelete(ticket._id);
                          setIsDeleteModalOpen(true);
                        }}
                        className="rounded-full p-2 transition-colors hover:bg-gray-100"
                      >
                        <Trash2 size={18} className="text-[#FF3D00]" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="rounded-lg border px-4 py-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Trước
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`rounded-lg border px-4 py-2 hover:bg-gray-50 ${
                        currentPage === page
                          ? "bg-[#FF3D00] text-white hover:bg-[#FF3D00]/90"
                          : ""
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-lg border px-4 py-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Sau
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Create Ticket Modal */}
        <Modal
          isOpen={isNewTicketModalOpen}
          onClose={() => setIsNewTicketModalOpen(false)}
          title="Tạo Support Ticket Mới"
        >
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Tiêu đề</label>
              <input
                type="text"
                value={newTicket.subject}
                onChange={(e) =>
                  setNewTicket((prev) => ({ ...prev, subject: e.target.value }))
                }
                placeholder="Nhập tiêu đề..."
                className="w-full rounded-lg border p-2 focus:border-[#FF3D00] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Mô tả</label>
              <textarea
                value={newTicket.description}
                onChange={(e) =>
                  setNewTicket((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Nhập mô tả chi tiết..."
                rows={4}
                className="w-full rounded-lg border p-2 focus:border-[#FF3D00] focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsNewTicketModalOpen(false)}
                className="rounded-lg border px-4 py-2 hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleCreate}
                className="rounded-lg bg-[#FF3D00] px-4 py-2 text-white hover:bg-[#FF3D00]/90"
              >
                Tạo Ticket
              </button>
            </div>
          </div>
        </Modal>

        {/* Edit Ticket Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Chỉnh sửa Ticket"
        >
          {editingTicket && (
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Tiêu đề
                </label>
                <input
                  type="text"
                  value={editingTicket.subject}
                  onChange={(e) =>
                    setEditingTicket((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border p-2 focus:border-[#FF3D00] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Mô tả</label>
                <textarea
                  value={editingTicket.description}
                  onChange={(e) =>
                    setEditingTicket((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full rounded-lg border p-2 focus:border-[#FF3D00] focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-lg border px-4 py-2 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  onClick={handleUpdate}
                  className="rounded-lg bg-[#FF3D00] px-4 py-2 text-white hover:bg-[#FF3D00]/90"
                >
                  Cập nhật
                </button>
              </div>
            </div>
          )}
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setTicketToDelete(null);
          }}
          title="Xác nhận xóa"
        >
          <div className="space-y-4">
            <p>
              Bạn chắc chắn muốn xóa ticket này? Hành động này không thể hoàn
              tác.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setTicketToDelete(null);
                }}
                className="rounded-lg border px-4 py-2 hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                className="rounded-lg bg-[#FF3D00] px-4 py-2 text-white hover:bg-[#FF3D00]/90"
              >
                Xóa
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <Footer />
      <div className="fixed left-0 top-0 w-full">
        <Header />
      </div>
    </div>
  );
};

export default Support;
