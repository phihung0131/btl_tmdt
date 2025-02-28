const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const SupportTicketSchema = new mongoose.Schema(
    {
        customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: [true, "Thiếu Customer để tạo request"],
        },
        adminRespond: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AdminRespond",
        },
        status: {
            type: String,
            enum: [, "pending", "finish","update"],
            default: "pending",
            },
        subject: {
        type: String,
        required: [true, "Tiêu đề ticket là bắt buộc"],
        },
        description: {
        type: String,
        required: [true, "Nội dung ticket là bắt buộc"],
        },
        respond: {
        type: String,
        default: "",
        },
        
    },
    { timestamps: true }
);
SupportTicketSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
    indexFields: ["deletedAt"],
});
const SupportTicket = mongoose.model("SupportTicket", SupportTicketSchema);
module.exports = SupportTicket;