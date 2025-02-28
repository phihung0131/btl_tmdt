const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const PaymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Order ID là bắt buộc"],
    },
    method: {
      type: String,
      enum: ["COD", "MOMO", "ZALO"],
      required: [true, "Phương thức thanh toán là bắt buộc"],
    },
    status: {
      type: String,
      enum: ["success", "failure", "pending"],
      required: [true, "Trạng thái thanh toán là bắt buộc"],
    },
  },
  { timestamps: true }
);

// Apply mongoose-delete plugin with options
PaymentSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  indexFields: ["deletedAt"],
});

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
