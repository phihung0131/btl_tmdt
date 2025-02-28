const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên danh mục là bắt buộc"],
      trim: true, // Xóa khoảng cách đầu và cuối
      minlength: [3, "Tên danh mục phải dài ít nhất 3 ký tự"],
    },
    description: {
      type: String,
      required: [true, "Mô tả danh mục là bắt buộc"],
      minlength: [10, "Mô tả danh mục phải dài ít nhất 10 ký tự"],
    },
  },
  { timestamps: true }
);

// Apply mongoose-delete plugin with options
CategorySchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  indexFields: ["deletedAt"],
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
