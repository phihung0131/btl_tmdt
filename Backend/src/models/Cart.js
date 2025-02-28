const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const CartSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "Customer ID là bắt buộc"],
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Apply mongoose-delete plugin with options
CartSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  indexFields: ["deletedAt"],
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
