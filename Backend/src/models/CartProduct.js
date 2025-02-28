const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const CartProductSchema = new mongoose.Schema(
  {
    cart_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: [true, "Cart ID là bắt buộc"],
    },
    product_id: {
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

CartProductSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  indexFields: ["deletedAt"],
});

const CartProduct = mongoose.model("CartProduct", CartProductSchema);

module.exports = CartProduct;
