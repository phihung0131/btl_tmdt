const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const PromotionSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Sản phẩm khuyến mãi là bắt buộc"],
    },
    name: {
      type: String,
      required: [true, "Tên khuyến mãi là bắt buộc"],
      trim: true, // Xóa khoảng cách đầu và cuối
      minlength: [3, "Tên khuyến mãi phải dài ít nhất 3 ký tự"],
    },
    description: {
      type: String,
      required: [true, "Mô tả khuyến mãi là bắt buộc"],
      minlength: [10, "Mô tả khuyến mãi phải dài ít nhất 10 ký tự"],
    },
    discountPercent: {
      type: Number,
      required: [true, "Tỉ lệ giảm giá là bắt buộc"],
      min: [0, "Tỉ lệ giảm giá phải là số dương"],
    },
    startDate: {
      type: Date,
      required: [true, "Ngày bắt đầu là bắt buộc"],
      validate: {
        validator: function (v) {
          // Ensure startDate is earlier than endDate
          return this.endDate ? v < this.endDate : true;
        },
        message: "Ngày bắt đầu phải trước ngày kết thúc",
      },
    },
    endDate: {
      type: Date,
      required: [true, "Ngày kết thúc là bắt buộc"],
      validate: {
        validator: function (v) {
          // Ensure endDate is later than startDate
          return this.startDate ? v > this.startDate : true;
        },
        message: "Ngày kết thúc phải sau ngày bắt đầu",
      },
    },
  },
  { timestamps: true }
);

// Apply mongoose-delete plugin with options
PromotionSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  indexFields: ["deletedAt"],
});

const Promotion = mongoose.model("Promotion", PromotionSchema);

module.exports = Promotion;
