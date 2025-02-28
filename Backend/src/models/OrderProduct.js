const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const OrderProductSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Order ID là bắt buộc"],
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID là bắt buộc"],
    },
    quantity: {
      type: Number,
      required: [true, "Số lượng là bắt buộc"],
      min: [1, "Số lượng phải ít nhất là 1"],
    },
    color: {
      type: String,
      required: [true, "Màu sắc là bắt buộc"],
    },
    size: {
      type: Number,
      required: [true, "Kích thước là bắt buộc"],
    },
  },
  { timestamps: true }
);

// Apply mongoose-delete plugin with options
OrderProductSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  indexFields: ["deletedAt"],
});

const OrderProduct = mongoose.model("OrderProduct", OrderProductSchema);
module.exports = OrderProduct;
