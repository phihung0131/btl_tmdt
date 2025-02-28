import React, { useState, useEffect } from "react";
import {
  Send,
  Calendar,
  MessageCircle,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import apiService from "../../services/api";
const AdminSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [sortedTickets, setSortedTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [respondText, setRespondText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage] = useState(10);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Hỗ trợ khách hàng";

    apiService
      .getAdminSupportTickets()
      .then((res) => {
        // console.log(res.data.data);
        setTickets(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // setTickets(fetchedTickets);
  }, []);

  useEffect(() => {
    const pendingTickets = tickets
      .filter((ticket) => !ticket.respond)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    const respondedTickets = tickets
      .filter((ticket) => ticket.respond)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setSortedTickets([...pendingTickets, ...respondedTickets]);
  }, [tickets]);

  const handleRespond = () => {
    // Simulating response logic
    const updatedTickets = tickets.map((ticket) =>
      ticket._id === selectedTicket._id
        ? { ...ticket, respond: respondText }
        : ticket,
    );
    console.log(selectedTicket._id, respondText);
    apiService
      .putAdminSupportTicket(selectedTicket._id, respondText)
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });

    setTickets(updatedTickets);
    setRespondText("");
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  // Pagination logic
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = sortedTickets.slice(
    indexOfFirstTicket,
    indexOfLastTicket,
  );
  const totalPages = Math.ceil(sortedTickets.length / ticketsPerPage);

  return (
    <div className="min-h-screen border-b bg-white p-4 md:p-6">
      <h1 className="font-bold text-[#FF3D00] md:mb-6 md:text-2xl">
        Hỗ trợ khách hàng
      </h1>
      <div className="space-y-4">
        {currentTickets.map((ticket) => (
          <div
            key={ticket._id}
            className={`rounded-lg border-2 p-4 ${!ticket.respond ? "border-[#ff3D00]" : "border-gray-200"}`}
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center">
                <MessageCircle
                  color={!ticket.respond ? "#ff3D00" : "gray"}
                  className="mr-2"
                />
                <h2 className="text-lg font-semibold">{ticket.subject}</h2>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar size={16} className="mr-1" />
                {new Date(ticket.createdAt).toLocaleDateString()}
              </div>
            </div>
            <p className="mb-2">{ticket.description}</p>
            {ticket.respond ? (
              <div className="rounded bg-gray-100 p-2">
                <p className="font-medium text-gray-700">Phản hồi:</p>
                <p>{ticket.respond}</p>
              </div>
            ) : (
              <button
                onClick={() => {
                  setSelectedTicket(ticket);
                  setIsModalOpen(true);
                }}
                className="flex items-center rounded bg-[#ff3D00] px-4 py-2 text-white transition-colors hover:bg-red-700"
              >
                <Send className="mr-2" size={16} /> Trả lời
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-center space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="rounded p-2 hover:bg-gray-200 disabled:opacity-50"
        >
          <ChevronLeft />
        </button>
        <span className="text-sm">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="rounded p-2 hover:bg-gray-200 disabled:opacity-50"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Modal (unchanged from previous version) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#ff3D00]">
                Trả lời: {selectedTicket.subject}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <textarea
              className="mb-4 w-full rounded border p-2"
              rows={4}
              placeholder="Nhập phản hồi..."
              value={respondText}
              onChange={(e) => setRespondText(e.target.value)}
            />
            <div className="flex space-x-2">
              <button
                onClick={handleRespond}
                className="flex flex-1 items-center justify-center rounded bg-[#ff3D00] py-2 text-white transition-colors hover:bg-red-700"
              >
                <Check className="mr-2" size={16} /> Gửi phản hồi
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex flex-1 items-center justify-center rounded border border-gray-300 py-2 text-gray-700 transition-colors hover:bg-gray-100"
              >
                <X className="mr-2" size={16} /> Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSupport;
