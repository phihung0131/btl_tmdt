const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const CustomerVoucherSchema = new mongoose.Schema(
  {
    customerId: {
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
CustomerVoucherSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  indexFields: ["deletedAt"],
});

const CustomerVoucher = mongoose.model("CustomerVoucher", CustomerVoucherSchema);
module.exports = CustomerVoucher;
