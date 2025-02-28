const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const OrderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Customer ID là bắt buộc"],
    },

    status: {
      type: String,
      enum: [
        "Success",
        "Failure",
        "Delivering",
        "Order successful",
        "Preparing goods",
        "Waiting for payment",
      ],
      required: [true, "Trạng thái đơn hàng là bắt buộc"],
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      required: ["true", "Tên người đặt hàng là bắt buộc"],
    },
    phone: {
      type: String,
      required: ["true", "SĐT người đặt hàng là bắt buộc"],
    },
    address: {
      type: String,
      required: ["true", "Địa chỉ nhận hàng là bắt buộc"],
    },
  },
  { timestamps: true }
);

// Apply mongoose-delete plugin with options
OrderSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  indexFields: ["deletedAt"],
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
