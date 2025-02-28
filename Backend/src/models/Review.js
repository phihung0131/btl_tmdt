const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const ReviewSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Thiếu User để tạo Review"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Thiếu User để tạo Review"],
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
      min: [0, "Rating ít nhất là 0"],
      max: [5, "Rating không được vượt quá 5"],
      default: 5,
    },
  },
  { timestamps: true }
);

// Apply mongoose-delete plugin with options
ReviewSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  indexFields: ["deletedAt"],
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
