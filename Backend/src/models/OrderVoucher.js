const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const OrderVoucherSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Order ID là bắt buộc"],
    },
    voucherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Voucher",
      required: [true, "Voucher ID là bắt buộc"],
    },
  },
  { timestamps: true }
);

// Apply mongoose-delete plugin with options
OrderVoucherSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  indexFields: ["deletedAt"],
});

const OrderVoucher = mongoose.model("OrderVoucher", OrderVoucherSchema);
module.exports = OrderVoucher;
