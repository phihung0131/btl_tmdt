const sendResponse = require("../helper/sendResponse");
const SupportTicket = require("../models/SupportTicket");
const User = require("../models/User")
require("dotenv").config();

const supportController = {
    //customer
    // Lấy toàn bộ support ticket của customer
    getSupportCustomer: async (req, res) => {
        try {
            const customerID = req.user._id;
            const supportTickets = await SupportTicket.find({ customer: customerID }).sort({ createdAt: -1 });
            sendResponse(res, 200, "Lấy dữ liệu Support Ticket thành công", supportTickets);
        } catch (error) {
            sendResponse(res, 400, "Lỗi lấy dữ liệu Support Ticket", error.toString());
        }
    },
    //tao support ticket moi
    createSupportTicket: async (req, res) => {
        try {
            const { subject, description } = req.body;
            const customerID = req.user._id;
            const newSupportTicket = new SupportTicket({
                customer: customerID,
                adminRespond: null,
                subject,
                status: "pending",
                description,
                respond: "",
            });
            await newSupportTicket.save();
            sendResponse(res, 200, "Tạo Support Ticket thành công", newSupportTicket);
        } catch (error) {
            sendResponse(res, 400, "Lỗi tạo Support Ticket", error.toString());
        }
    },
    //sua support ticket
    updateSupportTicket: async (req, res) => {
        try {
            const { subject, description } = req.body;
            const supportTicketID = req.params.id;
            const supportTicket = await SupportTicket.findById(supportTicketID);
            if (!supportTicket) {
                return sendResponse(res, 400, "Không tìm thấy Support Ticket", null);
            }
            if (supportTicket.status === 'finish' || supportTicket.status === 'update') {
                return sendResponse(res, 400, "Support Ticket đã hoàn thành. Vui lòng tạo một Support Ticket mới.", null);
            }
            supportTicket.subject = subject || supportTicket.subject;
            supportTicket.description = description || supportTicket.description;
            await supportTicket.save();
            sendResponse(res, 200, "Cập nhật Support Ticket thành công", supportTicket);
        } catch (error) {
            sendResponse(res, 400, "Lỗi cập nhật Support Ticket", error.toString());
        }
    },
    //xoa support ticket
    deleteSupportTicket: async (req, res) => {
        try {
            const supportTicketID = req.params.id;
            const supportTicket = await SupportTicket.findById(supportTicketID);
            if (!supportTicket) {
                return sendResponse(res, 400, "Không tìm thấy Support Ticket", null);
            }
            if (supportTicket.status === 'finish' || supportTicket.status === 'update') {
                return sendResponse(res, 400, "Support Ticket đã được phản hồi. Không thể xóa.", null);
            }
            await supportTicket.delete();
            sendResponse(res, 200, "Xóa Support Ticket thành công", null);
        } catch (error) {
            sendResponse(res, 400, "Lỗi xóa Support Ticket", error.toString());
        }
    },
    //admin
    // Lấy toàn bộ support ticket của
    getSupportAdmin: async (req, res) => {
        try {
            const { status, sort } = req.query;
            const filter = {};
            if (status) {
                filter.status = status;
            }

            // Tạo điều kiện sắp xếp
            const sortCondition = {};
            if (sort === 'newest') {
                sortCondition.createdAt = -1; // Sắp xếp theo createdAt giảm dần (mới nhất)
            } else if (sort === 'oldest') {
                sortCondition.createdAt = 1; // Sắp xếp theo createdAt tăng dần (cũ nhất)
            }
            const supportTickets = await SupportTicket.find(filter)
            .sort(sortCondition);
            const data = await Promise.all(supportTickets.map(async (ticket) => {
                // Khai báo biến và gọi hàm trong map
                const user = await User.findOne({ _id: ticket.customer }).select('name email address');
                if (!user) {
                    return {
                        _id: ticket._id,
                        customer: "Người dùng hiện không tồn tại(tài khoản đã xóa hóa bị vô hiệu)",
                        adminRespond: ticket.adminRespond,
                        status: ticket.status,
                        subject: ticket.subject,
                        description: ticket.description,
                        respond: ticket.respond,
                        createdAt: ticket.createdAt,
                        updatedAt: ticket.updatedAt
                    };
                }
                return {
                    _id: ticket._id,
                    customer: {
                        _id: ticket.customer,
                        name: user.name,
                        email: user.email,
                        address: user.address
                    },
                    adminRespond: ticket.adminRespond,
                    status: ticket.status,
                    subject: ticket.subject,
                    description: ticket.description,
                    respond: ticket.respond,
                    createdAt: ticket.createdAt,
                    updatedAt: ticket.updatedAt
                };
            }));

            sendResponse(res, 200, "Lấy dữ liệu Support Ticket thành công", data);
        } catch (error) {
            sendResponse(res, 400, "Lỗi lấy dữ liệu Support Ticket", error.toString());
        }
    },
    //phan hoi support ticket
    respondSupportTicket: async (req, res) => {
        try {
            const adminRespondID = req.user._id;
            const respond = req.body.respond;
            const supportTicketID = req.params.id;
            const supportTicket = await SupportTicket
                .findById(supportTicketID)
            if (!supportTicket) {
                return sendResponse(res, 400, "Không tìm thấy Support Ticket", null);
            }
            if (supportTicket.status === 'finish' || supportTicket.status === 'update') {
                supportTicket.respond = respond;
                supportTicket.status = 'update';
                supportTicket.adminRespond = adminRespondID;
                await supportTicket.save();
                return sendResponse(res, 200, "Update Phản hồi Support Ticket thành công", supportTicket);
            }
            supportTicket.respond = respond;
            supportTicket.status = 'finish';
            supportTicket.adminRespond = adminRespondID;
            await supportTicket.save();
            return sendResponse(res, 200, "Phản hồi Support Ticket thành công", supportTicket);
        } catch (error) {
            return sendResponse(res, 400, "Lỗi phản hồi Support Ticket", error.toString());
        }
    }
};
module.exports = supportController;
