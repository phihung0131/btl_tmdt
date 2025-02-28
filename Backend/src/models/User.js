const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
      default: "None",
    },
    username: {
      type: String,
      unique: [true, "Username đã được sử dụng"],
    },
    email: {
      type: String,
      unique: [true, "Email đã được sử dụng"],
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["CUSTOMER", "ADMIN", "OWNER"],
      default: "CUSTOMER",
    },
    socialAccounts: [
      {
        provider: String,
        id: String,
      },
    ],
  },
  { timestamps: true }
);

// Middleware xác nhận username và email duy nhất
UserSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    if (error.keyPattern.username) {
      next(new Error("Username đã được sử dụng"));
    } else if (error.keyPattern.email) {
      next(new Error("Email đã được sử dụng"));
    } else {
      next(new Error("Giá trị đã tồn tại."));
    }
  } else {
    next();
  }
});

// Apply mongoose-delete plugin with options
UserSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  indexFields: ["deletedAt"],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
