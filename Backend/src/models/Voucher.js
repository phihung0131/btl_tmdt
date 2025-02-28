const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const VoucherSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Code voucher là bắt buộc"],
      unique: [true, "Code đã có"],
    },
    discountPercent: {
      type: Number,
      required: ["true", "Tỉ lệ giảm giá của voucher là bắt buộc"],
      default: 0,
    },
    expirationDate: {
      type: Date,
      required: ["true", "Hạn dùng của voucher là bắt buộc"],
    },
    quantity: {
      type: Number,
      required: [true, "Số lượng voucher là bắt buộc"],
      min: [1, "Số lượng phải ít nhất là 1"],
    },
  },
  { timestamps: true }
);

// Apply mongoose-delete plugin with options
VoucherSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  indexFields: ["deletedAt"],
});

const Voucher = mongoose.model("Voucher", VoucherSchema);
module.exports = Voucher;
